import { useState, useEffect } from 'react';
import { Cloud, Sun, Droplets, Wind, CloudRain, SunMedium } from 'lucide-react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  rainAlert: boolean;
  location: string;
}

export default function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Real-time listener for Settings/Weather
    const unsubscribe = onSnapshot(doc(db, 'settings', 'weather'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setWeather({
          temp: data.data?.temp || 0,
          condition: data.data?.condition || 'Unknown',
          humidity: data.data?.humidity || 0,
          wind: data.data?.wind || 0,
          rainAlert: data.data?.rainAlert || false,
          location: data.location || 'Ongole'
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="animate-pulse flex items-center gap-2 text-xs text-muted-foreground">🌤️ Loading...</div>;
  if (!weather) return null;

  const IconComponent = weather.condition.includes('Rain') ? CloudRain :
    weather.condition.includes('Cloud') ? Cloud :
      weather.condition.includes('Sunny') ? Sun : SunMedium;

  if (compact) {
    return (
      <div className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl glass-card border border-border text-xs">
        <IconComponent className="w-4 h-4 text-primary" />
        <span className="font-medium">{weather.temp}°C</span>
        <span className="text-muted-foreground">{weather.location}</span>
      </div>
    );
  }

  return (
    <div className="feature-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-xs">Campus Weather</h4>
        <span className="text-[10px] text-muted-foreground">{weather.location}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-grotesk font-bold text-2xl">{weather.temp}°C</p>
          <p className="text-xs text-muted-foreground">{weather.condition}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> {weather.humidity}%</span>
        <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> {weather.wind} km/h</span>
      </div>
      {weather.rainAlert && (
        <div className="mt-3 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-medium">
          🌧️ Rain expected today
        </div>
      )}
    </div>
  );
}
