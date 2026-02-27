import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Mail } from 'lucide-react';
import { extendedFaculty } from '@/data/extendedData';

export default function FacultyList() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = extendedFaculty.filter(f => {
    const matchDept = filter === 'all' || f.dept === filter;
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase()) ||
                        f.deptFull.toLowerCase().includes(search.toLowerCase());
    return matchDept && matchSearch;
  });

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Our <span className="gradient-text">Faculty</span></h1>
          <p className="section-subtitle">Meet the experts who shape your academic journey</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search faculty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['all', 'cse', 'ece', 'mech', 'civil'].map(d => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                  filter === d ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {d === 'all' ? 'All' : d.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Faculty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(f => (
            <Link key={f.id} to={`/faculty/${f.id}`} className="feature-card p-6 group">
              <div className="flex items-center gap-4">
                <img src={f.image} alt={f.name} className="w-16 h-16 rounded-xl object-cover" />
                <div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">{f.name}</h3>
                  <p className="text-xs text-primary mt-0.5">{f.role}</p>
                  <p className="text-xs text-muted-foreground">{f.deptFull}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span>🎓 {f.experience}</span>
                <span>📄 {f.publications} publications</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
                <Mail className="w-3 h-3" /> {f.email}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
