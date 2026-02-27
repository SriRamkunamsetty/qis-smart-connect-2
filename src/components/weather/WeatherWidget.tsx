import { Cloud, Sun, Droplets, Wind } from 'lucide-react';

// Placeholder weather data (would connect to API)
const weatherData = {
  temp: 28,
  condition: 'Partly Cloudy',
  humidity: 65,
  wind: 12,
  rainAlert: false,
  icon: 'partly-cloudy',
};

export default function WeatherWidget({ compact = false }: { compact?: boolean }) {
  const IconComponent = weatherData.condition.includes('Cloud') ? Cloud : Sun;

  if (compact) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-border text-xs">
        <IconComponent className="w-3.5 h-3.5 text-primary" />
        <span className="font-medium">{weatherData.temp}°C</span>
        <span className="text-muted-foreground">{weatherData.condition}</span>
      </div>
    );
  }

  return (
    <div className="feature-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold text-xs">Campus Weather</h4>
        <span className="text-[10px] text-muted-foreground">Ongole</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <IconComponent className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="font-grotesk font-bold text-2xl">{weatherData.temp}°C</p>
          <p className="text-xs text-muted-foreground">{weatherData.condition}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><Droplets className="w-3 h-3" /> {weatherData.humidity}%</span>
        <span className="flex items-center gap-1"><Wind className="w-3 h-3" /> {weatherData.wind} km/h</span>
      </div>
      {weatherData.rainAlert && (
        <div className="mt-3 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-medium">
          🌧️ Rain expected today
        </div>
      )}
    </div>
  );
}
