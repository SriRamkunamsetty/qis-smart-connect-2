import { Calendar, MapPin, Users } from 'lucide-react';

const events = [
  { name: 'TechVista 2025', date: 'March 15-17, 2025', type: 'Tech Fest', desc: 'Annual technical festival with coding contests, hackathons, robotics challenges, and workshops.', attendees: '3000+', location: 'Main Campus' },
  { name: 'Sargam 2025', date: 'April 5-6, 2025', type: 'Cultural Fest', desc: 'Cultural extravaganza featuring dance, music, drama, and art competitions.', attendees: '5000+', location: 'Open Air Theatre' },
  { name: 'Industry Connect Summit', date: 'February 20, 2025', type: 'Seminar', desc: 'Industry leaders share insights on emerging technologies and career opportunities.', attendees: '800+', location: 'Auditorium' },
  { name: 'National Level Hackathon', date: 'January 25-26, 2025', type: 'Competition', desc: '36-hour coding marathon with prizes worth ₹5 Lakhs. Open to all engineering colleges.', attendees: '500+', location: 'CS Block' },
  { name: 'Alumni Meet 2025', date: 'May 10, 2025', type: 'Networking', desc: 'Annual reunion of QISCET alumni to strengthen industry-academia connections.', attendees: '1000+', location: 'Convention Hall' },
  { name: 'Sports Meet', date: 'December 12-14, 2024', type: 'Sports', desc: 'Inter-department sports competition with 15+ events including athletics, cricket, and basketball.', attendees: '2000+', location: 'Sports Complex' },
];

const typeColors: Record<string, string> = {
  'Tech Fest': 'bg-blue-500/10 text-blue-600',
  'Cultural Fest': 'bg-pink-500/10 text-pink-600',
  'Seminar': 'bg-amber-500/10 text-amber-600',
  'Competition': 'bg-green-500/10 text-green-600',
  'Networking': 'bg-purple-500/10 text-purple-600',
  'Sports': 'bg-red-500/10 text-red-600',
};

export default function EventsPage() {
  return (
    <div className="animate-fade-in space-y-4">
      {events.map(e => (
        <div key={e.name} className="feature-card">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-sm">{e.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${typeColors[e.type] || 'bg-muted text-muted-foreground'}`}>{e.type}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{e.desc}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{e.date}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{e.location}</span>
                <span className="flex items-center gap-1"><Users className="w-3 h-3" />{e.attendees}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
