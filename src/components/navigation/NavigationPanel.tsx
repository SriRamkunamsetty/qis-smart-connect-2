import React, { useState } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { MapComponent } from './MapComponent';
import { ModeSelector } from './ModeSelector';
import { RouteInfo } from './RouteInfo';
import { ExternalLink } from 'lucide-react';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';

export const NavigationPanel: React.FC = () => {
    const [travelMode, setTravelMode] = useState<google.maps.TravelMode>('DRIVING' as google.maps.TravelMode);
    const [routeInfo, setRouteInfo] = useState({
        distance: '',
        duration: '',
        arrivalTime: '',
    });

    const openInGoogleMaps = () => {
        const destination = encodeURIComponent('QIS College of Engineering & Technology, Ongole');
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
    };

    if (!GOOGLE_MAPS_API_KEY) {
        return (
            <div className="feature-card p-8 text-center">
                <p className="text-muted-foreground mb-4">Google Maps API Key missing.</p>
                <p className="text-xs">Please add VITE_GOOGLE_MAPS_API_KEY to your .env file.</p>
            </div>
        );
    }

    return (
        <div className="feature-card overflow-hidden p-0 h-[600px] flex flex-col md:flex-row shadow-2xl border-primary/10">
            <div className="flex-1 min-h-[300px] relative">
                <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
                    <MapComponent
                        travelMode={travelMode}
                        onRouteInfoUpdate={setRouteInfo}
                    />
                </APIProvider>

                <div className="absolute top-4 left-4 right-4 md:hidden">
                    <ModeSelector currentMode={travelMode} onModeChange={setTravelMode} />
                </div>
            </div>

            <div className="w-full md:w-80 p-6 flex flex-col justify-between bg-card/50 backdrop-blur-sm border-t md:border-t-0 md:border-l border-border">
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-grotesk font-bold text-xl">Campus Navigator</h3>
                        <div className="hidden md:block">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-glow inline-block" />
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="hidden md:block">
                            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Travel Mode</p>
                            <ModeSelector currentMode={travelMode} onModeChange={setTravelMode} />
                        </div>

                        <div>
                            <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Route Details</p>
                            <RouteInfo {...routeInfo} />
                        </div>
                    </div>
                </div>

                <button
                    onClick={openInGoogleMaps}
                    className="btn-primary w-full justify-center py-4 rounded-xl mt-6 group"
                >
                    Open In App
                    <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};
