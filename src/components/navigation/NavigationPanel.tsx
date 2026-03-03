import React, { useState } from 'react';
import { MapComponent } from './MapComponent';
import { ModeSelector } from './ModeSelector';
import { RouteInfo } from './RouteInfo';
import { ExternalLink, Navigation } from 'lucide-react';

export const NavigationPanel: React.FC = () => {
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeInfo, setRouteInfo] = useState({
    distance: '',
    duration: '',
    arrivalTime: '',
  });
  const [modeDurations, setModeDurations] = useState<Record<string, string>>({});

  const openInGoogleMaps = () => {
    const destination = '15.4980,80.0535';
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  };

  return (
    <div className="feature-card overflow-hidden p-0 h-[600px] flex flex-col md:flex-row shadow-2xl border-primary/10">
      <div className="flex-1 min-h-[300px] relative">
        <MapComponent
          travelMode={travelMode}
          onRouteInfoUpdate={setRouteInfo}
          onModeDurationsUpdate={setModeDurations}
          isNavigating={isNavigating}
        />

        <div className="absolute top-4 left-4 right-4 md:hidden z-[1000]">
          <ModeSelector currentMode={travelMode} onModeChange={setTravelMode} modeDurations={modeDurations} />
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
              <ModeSelector currentMode={travelMode} onModeChange={setTravelMode} modeDurations={modeDurations} />
            </div>

            <div>
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Route Details</p>
              <RouteInfo {...routeInfo} />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 mt-6">
          <button
            onClick={() => setIsNavigating(!isNavigating)}
            className={`btn-primary w-full justify-center py-4 rounded-xl group transition-all shrink-0 ${isNavigating ? 'bg-destructive/10 text-destructive border-transparent shadow-none hover:bg-destructive/20 hover:-translate-y-0.5' : ''}`}
          >
            {isNavigating ? 'Stop Navigation' : 'Start Navigation'}
            <Navigation className={`w-4 h-4 ml-2 ${isNavigating ? '' : 'group-hover:translate-x-1'} transition-transform`} />
          </button>
          <button
            onClick={openInGoogleMaps}
            className="btn-outline w-full justify-center py-3 rounded-xl group shrink-0"
          >
            Open In App
            <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
