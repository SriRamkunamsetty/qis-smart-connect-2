import React from 'react';
import { Car, Footprints, Bike, Bus } from 'lucide-react';

interface ModeSelectorProps {
    currentMode: google.maps.TravelMode;
    onModeChange: (mode: google.maps.TravelMode) => void;
}

export const ModeSelector: React.FC<ModeSelectorProps> = ({ currentMode, onModeChange }) => {
    const modes = [
        { label: 'Driving', mode: google.maps.TravelMode.DRIVING, icon: Car },
        { label: 'Walking', mode: google.maps.TravelMode.WALKING, icon: Footprints },
        { label: 'Biking', mode: google.maps.TravelMode.BICYCLING, icon: Bike },
        { label: 'Transit', mode: google.maps.TravelMode.TRANSIT, icon: Bus },
    ];

    return (
        <div className="flex gap-2 p-1 bg-muted rounded-xl">
            {modes.map(({ label, mode, icon: Icon }) => (
                <button
                    key={mode}
                    onClick={() => onModeChange(mode)}
                    className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all ${currentMode === mode
                        ? 'bg-gradient-primary text-white shadow-sm'
                        : 'hover:bg-background/80 text-muted-foreground'
                        }`}
                >
                    <Icon className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-medium">{label}</span>
                </button>
            ))}
        </div>
    );
};
