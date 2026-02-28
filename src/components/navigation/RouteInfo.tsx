import React from 'react';
import { Navigation2, Clock, MapPin } from 'lucide-react';

interface RouteInfoProps {
    distance: string;
    duration: string;
    arrivalTime: string;
}

export const RouteInfo: React.FC<RouteInfoProps> = ({ distance, duration, arrivalTime }) => {
    return (
        <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center p-3 glass-card rounded-xl">
                <MapPin className="w-4 h-4 text-primary mb-1" />
                <span className="text-[10px] text-muted-foreground uppercase">Distance</span>
                <span className="text-sm font-bold">{distance || '--'}</span>
            </div>
            <div className="flex flex-col items-center p-3 glass-card rounded-xl">
                <Clock className="w-4 h-4 text-emerald-500 mb-1" />
                <span className="text-[10px] text-muted-foreground uppercase">Time</span>
                <span className="text-sm font-bold">{duration || '--'}</span>
            </div>
            <div className="flex flex-col items-center p-3 glass-card rounded-xl">
                <Navigation2 className="w-4 h-4 text-amber-500 mb-1" />
                <span className="text-[10px] text-muted-foreground uppercase">Arrival</span>
                <span className="text-sm font-bold">{arrivalTime || '--'}</span>
            </div>
        </div>
    );
};
