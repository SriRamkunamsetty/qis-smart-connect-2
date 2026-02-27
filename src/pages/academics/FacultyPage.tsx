import { faculty, departments } from '@/data/dummyData';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Award } from 'lucide-react';

export default function FacultyPage() {
  const [filterDept, setFilterDept] = useState('all');

  const filtered = filterDept === 'all' ? faculty : faculty.filter(f => f.dept === filterDept);

  return (
    <div className="animate-fade-in">
      {/* Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          onClick={() => setFilterDept('all')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterDept === 'all' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
        >
          All Departments
        </button>
        {departments.map(d => (
          <button
            key={d.id}
            onClick={() => setFilterDept(d.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterDept === d.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
          >
            {d.shortName}
          </button>
        ))}
      </div>

      {/* Faculty Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map(f => {
          const dept = departments.find(d => d.id === f.dept);
          return (
            <Link key={f.id} to={`/faculty/${f.id}`} className="feature-card group block">
              <div className="flex items-center gap-4 mb-3">
                <img src={f.image} alt={f.name} className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform" />
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{f.name}</h3>
                  <p className="text-xs text-muted-foreground">{f.role}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1"><Award className="w-3 h-3 text-primary" />{f.experience}</div>
                {dept && <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary">{dept.shortName}</span>}
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No faculty found for this department.</p>
        </div>
      )}
    </div>
  );
}
