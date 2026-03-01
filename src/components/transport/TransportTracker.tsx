import { useState, useEffect } from 'react';
import { Bus, MapPin, Clock, Phone, Navigation, Route, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Stop {
  name: string;
  time: string;
}

interface TransportRoute {
  id: string;
  route_name: string;
  bus_number: string;
  stops: Stop[];
  departure_time: string;
  estimated_arrival: string;
  distance_km: number;
  fee_per_year: number;
  driver_name: string | null;
  driver_phone: string | null;
  is_active: boolean;
}

function formatTime(time: string) {
  const [h, m] = time.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 || 12;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function getTimeDiff(departure: string, arrival: string) {
  const [dh, dm] = departure.split(':').map(Number);
  const [ah, am] = arrival.split(':').map(Number);
  const diff = (ah * 60 + am) - (dh * 60 + dm);
  return `${Math.floor(diff / 60)}h ${diff % 60}m`;
}

export default function TransportTracker() {
  const [routes, setRoutes] = useState<TransportRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data } = await (supabase as any)
        .from('transport_routes')
        .select('*')
        .eq('is_active', true)
        .order('departure_time');
      
      setRoutes((data || []).map((r: any) => ({
        ...r,
        stops: typeof r.stops === 'string' ? JSON.parse(r.stops) : r.stops,
      })));
      setLoading(false);
    };
    fetchRoutes();
  }, []);

  const selected = routes.find(r => r.id === selectedRoute);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Bus className="w-4 h-4" />
            Live Tracking
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-3">
            Transport <span className="gradient-text">Route Tracker</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View bus routes, pickup timings, and estimated arrival times for all campus transport.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-20 text-muted-foreground">Loading routes...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Route List */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-grotesk font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-2">All Routes</h3>
              {routes.map(route => (
                <button
                  key={route.id}
                  onClick={() => setSelectedRoute(route.id)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedRoute === route.id
                      ? 'bg-primary/5 border-primary/30 shadow-sm'
                      : 'bg-card border-border hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      selectedRoute === route.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <Bus className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{route.route_name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-muted-foreground font-mono">{route.bus_number}</span>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-muted-foreground">{route.distance_km} km</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1.5">
                        <Clock className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-primary">
                          {formatTime(route.departure_time)} → {formatTime(route.estimated_arrival)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Route Details */}
            <div className="lg:col-span-2">
              {selected ? (
                <div className="space-y-5">
                  {/* Header Card */}
                  <div className="feature-card">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h2 className="font-grotesk font-bold text-xl">{selected.route_name}</h2>
                        <p className="text-sm text-muted-foreground mt-1">Bus {selected.bus_number}</p>
                      </div>
                      <div className="text-right">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-medium">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          Active
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: 'Departure', value: formatTime(selected.departure_time), icon: Clock },
                        { label: 'Arrival', value: formatTime(selected.estimated_arrival), icon: Navigation },
                        { label: 'Duration', value: getTimeDiff(selected.departure_time, selected.estimated_arrival), icon: Route },
                        { label: 'Fee/Year', value: `₹${selected.fee_per_year.toLocaleString()}`, icon: AlertCircle },
                      ].map(stat => (
                        <div key={stat.label} className="p-3 rounded-xl bg-muted text-center">
                          <stat.icon className="w-4 h-4 text-primary mx-auto mb-1" />
                          <p className="text-sm font-bold">{stat.value}</p>
                          <p className="text-[10px] text-muted-foreground">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Driver Info */}
                  {selected.driver_name && (
                    <div className="feature-card flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Phone className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{selected.driver_name}</p>
                        <p className="text-xs text-muted-foreground">Driver • {selected.driver_phone}</p>
                      </div>
                    </div>
                  )}

                  {/* Stops Timeline */}
                  <div className="feature-card">
                    <h3 className="font-grotesk font-semibold text-sm mb-5 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      Stops ({selected.stops.length})
                    </h3>
                    <div className="relative">
                      <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-border" />
                      <div className="space-y-0">
                        {selected.stops.map((stop, i) => {
                          const isFirst = i === 0;
                          const isLast = i === selected.stops.length - 1;
                          return (
                            <div key={i} className="flex items-center gap-4 py-3 relative">
                              <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center z-10 flex-shrink-0 ${
                                isFirst || isLast ? 'bg-primary text-primary-foreground' : 'bg-card border-2 border-primary/30'
                              }`}>
                                {isFirst || isLast ? (
                                  <MapPin className="w-3.5 h-3.5" />
                                ) : (
                                  <div className="w-2 h-2 rounded-full bg-primary/50" />
                                )}
                              </div>
                              <div className="flex-1 flex items-center justify-between">
                                <span className={`text-sm ${isFirst || isLast ? 'font-semibold' : ''}`}>{stop.name}</span>
                                <span className="text-xs font-mono text-primary font-medium">{stop.time}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="feature-card text-center py-20">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Bus className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-grotesk font-semibold mb-2">Select a Route</h3>
                  <p className="text-sm text-muted-foreground">Click on a route to view detailed stops and timings</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
