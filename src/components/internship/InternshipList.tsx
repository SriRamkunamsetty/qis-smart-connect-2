import { useState } from 'react';
import { Briefcase, Clock, Filter } from 'lucide-react';
import { internships } from '@/data/extendedData';

interface Props {
  onApply?: (id: number) => void;
}

export default function InternshipList({ onApply }: Props) {
  const [domain, setDomain] = useState('All');
  const domains = ['All', ...new Set(internships.map(i => i.domain))];

  const filtered = domain === 'All' ? internships : internships.filter(i => i.domain === domain);

  return (
    <div>
      {/* Filter */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <Filter className="w-4 h-4 text-muted-foreground" />
        {domains.map(d => (
          <button
            key={d}
            onClick={() => setDomain(d)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              domain === d ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {d}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map(intern => (
          <div key={intern.id} className="feature-card p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-sm">{intern.title}</h3>
                <p className="text-primary text-xs font-medium mt-0.5">{intern.company}</p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-medium ${
                intern.status === 'open' ? 'bg-green-500/10 text-green-500' : 'bg-muted text-muted-foreground'
              }`}>
                {intern.status === 'open' ? 'Open' : 'Closed'}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground mb-4">
              <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" />{intern.domain}</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{intern.duration}</span>
              <span>💰 {intern.stipend}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-muted-foreground">Deadline: {intern.deadline}</span>
              {intern.status === 'open' && (
                <button
                  onClick={() => onApply?.(intern.id)}
                  className="btn-primary text-xs px-4 py-2"
                >
                  Apply
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
