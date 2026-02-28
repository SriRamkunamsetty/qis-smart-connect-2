import React, { useEffect, useState } from 'react';
import { APIProvider, Map, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Location, LocationService } from '../../services/LocationService';

// QIS College Coordinator coords
const QISCET_LOCATION = { lat: 15.4852, lng: 80.0163 };

interface MapComponentProps {
    travelMode: google.maps.TravelMode;
    onRouteInfoUpdate: (info: { distance: string; duration: string; arrivalTime: string }) => void;
}

export const MapComponent: React.FC<MapComponentProps> = ({ travelMode, onRouteInfoUpdate }) => {
    const map = useMap();
    const routesLibrary = useMapsLibrary('routes');
    const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);
    const [directionsService, setDirectionsService] = useState<google.maps.DirectionsService | null>(null);
    const [userLocation, setUserLocation] = useState<Location | null>(null);

    useEffect(() => {
        if (!routesLibrary || !map) return;
        setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
        setDirectionsService(new routesLibrary.DirectionsService());
    }, [routesLibrary, map]);

    useEffect(() => {
        const watchId = LocationService.watchLocation(
            (location) => setUserLocation(location),
            (error) => console.error('Location Error:', error)
        );
        return () => LocationService.clearWatch(watchId);
    }, []);

    useEffect(() => {
        if (!directionsService || !directionsRenderer || !userLocation) return;

        directionsService.route(
            {
                origin: userLocation,
                destination: QISCET_LOCATION,
                travelMode,
            },
            (result, status) => {
                if (status === 'OK' && result) {
                    directionsRenderer.setDirections(result);
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
                }
            }
        );
    }, [directionsService, directionsRenderer, userLocation, travelMode, onRouteInfoUpdate]);

    return (
        <Map
            defaultCenter={QISCET_LOCATION}
            defaultZoom={15}
            mapId="QISCET_MAP"
            disableDefaultUI={true}
            className="w-full h-full rounded-2xl md:rounded-3xl"
        />
    );
};
