import React, { useEffect, useState, useRef, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const QISCET_LOCATION = { lat: 15.4980, lng: 80.0535 };

// Fix default Leaflet marker icons
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const campusIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = defaultIcon;

interface MapComponentProps {
  travelMode: string;
  onRouteInfoUpdate: (info: { distance: string; duration: string; arrivalTime: string }) => void;
  onModeDurationsUpdate?: (durations: Record<string, string>) => void;
  isNavigating?: boolean;
}

const OSRM_PROFILES: Record<string, string> = {
  DRIVING: 'car',
  WALKING: 'foot',
  BICYCLING: 'bike',
  TRANSIT: 'car', // OSRM has no transit; approximate with car
};

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${Math.round(seconds)} sec`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`;
  const hours = Math.floor(seconds / 3600);
  const mins = Math.round((seconds % 3600) / 60);
  return `${hours} hr ${mins} min`;
}

function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)} m`;
  return `${(meters / 1000).toFixed(1)} km`;
}

function decodePolyline(encoded: string): [number, number][] {
  const points: [number, number][] = [];
  let index = 0, lat = 0, lng = 0;
  while (index < encoded.length) {
    let b, shift = 0, result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lat += (result & 1) ? ~(result >> 1) : (result >> 1);
    shift = 0; result = 0;
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5; } while (b >= 0x20);
    lng += (result & 1) ? ~(result >> 1) : (result >> 1);
    points.push([lat / 1e5, lng / 1e5]);
  }
  return points;
}

async function fetchOSRMRoute(
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  profile: string
): Promise<{ distance: number; duration: number; geometry: [number, number][] } | null> {
  try {
    const url = `https://router.project-osrm.org/route/v1/${profile}/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=full&geometries=polyline`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.code === 'Ok' && data.routes?.[0]) {
      const route = data.routes[0];
      return {
        distance: route.distance,
        duration: route.duration,
        geometry: decodePolyline(route.geometry),
      };
    }
    return null;
  } catch {
    return null;
  }
}

// Component to fit map bounds to route
function MapBoundsUpdater({ userLocation, routeGeometry }: { userLocation: { lat: number; lng: number } | null; routeGeometry: [number, number][] }) {
  const map = useMap();
  useEffect(() => {
    if (routeGeometry.length > 0) {
      const bounds = L.latLngBounds(routeGeometry.map(([lat, lng]) => [lat, lng]));
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [map, userLocation, routeGeometry]);
  return null;
}

export const MapComponent: React.FC<MapComponentProps> = ({ travelMode, onRouteInfoUpdate, onModeDurationsUpdate, isNavigating }) => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [routeGeometry, setRouteGeometry] = useState<[number, number][]>([]);
  const watchIdRef = useRef<number | null>(null);

  // Get initial location
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Watch position when navigating
  useEffect(() => {
    if (isNavigating && navigator.geolocation) {
      watchIdRef.current = navigator.geolocation.watchPosition(
        (pos) => setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error('Watch error:', err),
        { enableHighAccuracy: true, maximumAge: 0 }
      );
    } else if (!isNavigating && watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
    return () => {
      if (watchIdRef.current !== null) navigator.geolocation.clearWatch(watchIdRef.current);
    };
  }, [isNavigating]);

  // Fetch route for current mode
  useEffect(() => {
    if (!userLocation) return;
    const profile = OSRM_PROFILES[travelMode] || 'car';
    fetchOSRMRoute(userLocation, QISCET_LOCATION, profile).then((result) => {
      if (result) {
        setRouteGeometry(result.geometry);
        const now = new Date();
        const arrival = new Date(now.getTime() + result.duration * 1000);
        onRouteInfoUpdate({
          distance: formatDistance(result.distance),
          duration: formatDuration(result.duration),
          arrivalTime: arrival.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      }
    });
  }, [userLocation, travelMode, onRouteInfoUpdate]);

  // Fetch durations for all modes
  useEffect(() => {
    if (!userLocation || !onModeDurationsUpdate) return;
    const modes = ['DRIVING', 'WALKING', 'BICYCLING', 'TRANSIT'];
    Promise.all(
      modes.map(async (mode) => {
        const profile = OSRM_PROFILES[mode] || 'car';
        const result = await fetchOSRMRoute(userLocation, QISCET_LOCATION, profile);
        return { mode, duration: result ? formatDuration(result.duration) : '--' };
      })
    ).then((results) => {
      const durations: Record<string, string> = {};
      results.forEach((r) => { durations[r.mode] = r.duration; });
      onModeDurationsUpdate(durations);
    });
  }, [userLocation, onModeDurationsUpdate]);

  const center = userLocation || QISCET_LOCATION;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={13}
        style={{ width: '100%', height: '100%', borderRadius: '1rem' }}
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <MapBoundsUpdater userLocation={userLocation} routeGeometry={routeGeometry} />

        {userLocation && (
          <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        )}

        <Marker position={[QISCET_LOCATION.lat, QISCET_LOCATION.lng]} icon={campusIcon}>
          <Popup>QISCET Campus</Popup>
        </Marker>

        {routeGeometry.length > 0 && (
          <Polyline positions={routeGeometry} pathOptions={{ color: '#6366f1', weight: 5, opacity: 0.8 }} />
        )}
      </MapContainer>
    </div>
  );
};
