import { Trophy, Medal, Target } from 'lucide-react';

const sports = [
  { name: 'Cricket', facilities: 'Full-size ground, practice nets', achievements: 'JNTU Inter-College Champions 2024' },
  { name: 'Basketball', facilities: 'Indoor & outdoor courts', achievements: 'State-level runners-up 2023' },
  { name: 'Volleyball', facilities: 'Outdoor court with floodlights', achievements: 'District champions 3 consecutive years' },
  { name: 'Badminton', facilities: 'Indoor court (4 courts)', achievements: 'University gold medal 2024' },
  { name: 'Athletics', facilities: '400m track, field equipment', achievements: 'Multiple state-level medals' },
  { name: 'Table Tennis', facilities: 'Indoor hall with 4 tables', achievements: 'Inter-college champions 2024' },
  { name: 'Chess', facilities: 'Dedicated chess room', achievements: 'University chess champion 2024' },
  { name: 'Kabaddi', facilities: 'Standard court', achievements: 'JNTU tournament winners 2023' },
];

export default function SportsPage() {
  return (
    <div className="animate-fade-in space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: Trophy, label: 'Sports Titles Won', value: '45+' },
          { icon: Medal, label: 'State-Level Athletes', value: '120+' },
          { icon: Target, label: 'Sports Played', value: '15+' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="feature-card text-center">
            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-grotesk font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sports.map(s => (
          <div key={s.name} className="feature-card">
            <h3 className="font-semibold text-sm mb-2">{s.name}</h3>
            <p className="text-xs text-muted-foreground mb-1">🏟️ {s.facilities}</p>
            <p className="text-xs text-primary">🏆 {s.achievements}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
