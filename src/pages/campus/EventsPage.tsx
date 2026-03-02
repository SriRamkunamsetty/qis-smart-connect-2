import { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Loader2 } from 'lucide-react';
import { eventService, CampusEvent } from '@/services/eventService';

const typeColors: Record<string, string> = {
  'Technical': 'bg-blue-500/10 text-blue-600',
  'Cultural': 'bg-pink-500/10 text-pink-600',
  'Placement': 'bg-amber-500/10 text-amber-600',
  'Sports': 'bg-red-500/10 text-red-600',
};

export default function EventsPage() {
  const [events, setEvents] = useState<CampusEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const unsubscribe = eventService.subscribeToEvents((data) => {
      if (mounted) {
        setEvents(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  if (loading) {
    return <div className="py-10 text-center"><Loader2 className="w-8 h-8 text-primary animate-spin mx-auto" /></div>;
  }

  return (
    <div className="animate-fade-in space-y-4">
      {events.map(e => (
        <div key={e.id} className="feature-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm">{e.title}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[e.category] || 'bg-muted text-muted-foreground'}`}>{e.category}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{e.description}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{e.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                {e.organizer && <span className="flex items-center gap-1"><Users className="w-3 h-3" />{e.organizer}</span>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
