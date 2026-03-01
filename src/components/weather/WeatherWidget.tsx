import { useState, useEffect } from 'react';
import { Cloud, Sun, Droplets, Wind, CloudRain, SunMedium } from 'lucide-react';

interface WeatherData {
  temp: number;
  condition: string;
  humidity: number;
  wind: number;
  rainAlert: boolean;
  location: string;
  icon: string;
}

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || '';
const DEFAULT_LAT = 15.5057; // Ongole latitude
const DEFAULT_LON = 80.0499; // Ongole longitude

async function fetchWeather(): Promise<WeatherData | null> {
  if (!OPENWEATHER_API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${DEFAULT_LAT}&lon=${DEFAULT_LON}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return {
      temp: Math.round(data.main.temp),
      condition: data.weather?.[0]?.main || 'Clear',
      humidity: data.main.humidity,
      wind: Math.round(data.wind.speed * 3.6), // m/s to km/h
      rainAlert: data.weather?.[0]?.main === 'Rain',
      location: 'Ongole',
      icon: data.weather?.[0]?.icon || '01d',
    };
  } catch {
    return null;
  }
}

// Fallback static weather when API key is not available
const fallbackWeather: WeatherData = {
  temp: 32,
  condition: 'Sunny',
  humidity: 65,
  wind: 12,
  rainAlert: false,
  location: 'Ongole',
  icon: '01d',
};

export default function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const live = await fetchWeather();
      setWeather(live || fallbackWeather);
      setLoading(false);
    };
    load();
    // Refresh every 10 minutes
    const interval = setInterval(load, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) return <div className="animate-pulse flex items-center gap-2 text-xs text-muted-foreground">🌤️ Loading...</div>;
  if (!weather) return null;

  const IconComponent = weather.condition.includes('Rain') ? CloudRain :
    weather.condition.includes('Cloud') ? Cloud :
      weather.condition.includes('Sunny') || weather.condition.includes('Clear') ? Sun : SunMedium;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-border text-xs">
        <IconComponent className="w-3.5 h-3.5 text-primary" />
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
