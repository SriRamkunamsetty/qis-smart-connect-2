import React, { useEffect, useState, useCallback, useRef } from 'react';
import { GoogleMap, Marker, DirectionsRenderer, useLoadScript } from '@react-google-maps/api';
import { MAPS_API_KEY, GOOGLE_LIBRARIES } from '../../config/googleMaps';

const QISCET_LOCATION = { lat: 15.4980, lng: 80.0535 };

interface MapComponentProps {
    travelMode: google.maps.TravelMode | string;
    onRouteInfoUpdate: (info: { distance: string; duration: string; arrivalTime: string }) => void;
    isNavigating?: boolean;
}

const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem'
};

export const MapComponent: React.FC<MapComponentProps> = ({ travelMode, onRouteInfoUpdate, isNavigating }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: MAPS_API_KEY,
        libraries: GOOGLE_LIBRARIES as any,
    });

    const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
    const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
    const watchIdRef = useRef<number | null>(null);

    // Initial Location Grab
    useEffect(() => {
        if (!navigator.geolocation) return;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
            },
            (error) => console.error("Geolocation Error: ", error),
            { enableHighAccuracy: true }
        );
    }, []);

    // Active Navigation Watching
    useEffect(() => {
        if (isNavigating && navigator.geolocation) {
            watchIdRef.current = navigator.geolocation.watchPosition(
                (position) => {
                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                },
                (error) => console.error("WatchPosition Error: ", error),
                { enableHighAccuracy: true, maximumAge: 0 }
            );
        } else if (!isNavigating && watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        return () => {
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, [isNavigating]);

    // Calculate Route
    useEffect(() => {
        if (!isLoaded || !userLocation) return;

        const directionsService = new window.google.maps.DirectionsService();

        directionsService.route(
            {
                origin: userLocation,
                destination: QISCET_LOCATION,
                travelMode: typeof travelMode === 'string' ? travelMode as google.maps.TravelMode : travelMode,
            },
            (result, status) => {
                if (status === window.google.maps.DirectionsStatus.OK && result) {
                    setDirections(result);
                    const route = result.routes[0].legs[0];
                    if (route) {
                        const now = new Date();
                        const arrivalTime = new Date(now.getTime() + (route.duration?.value || 0) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        onRouteInfoUpdate({
                            distance: route.distance?.text || '',
                            duration: route.duration?.text || '',
                            arrivalTime,
                        });
                    }
                } else {
                    console.error(`Error fetching directions: ${status}`);
                }
            }
        );
    }, [isLoaded, userLocation, travelMode, onRouteInfoUpdate]);

    if (!isLoaded) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-muted/20 rounded-2xl md:rounded-3xl">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-sm font-medium text-muted-foreground">Loading Map System...</p>
                </div>
            </div>
        );
    }

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={15}
            center={userLocation || QISCET_LOCATION}
            options={{
                disableDefaultUI: true,
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false
            }}
        >
            {userLocation && <Marker position={userLocation} icon="https://maps.google.com/mapfiles/ms/icons/blue-dot.png" />}
            <Marker position={QISCET_LOCATION} title="QISCET Campus" />

            {directions && <DirectionsRenderer directions={directions} options={{ suppressMarkers: true }} />}
        </GoogleMap>
    );
};
