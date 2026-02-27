import { BookOpen, Clock, Wifi, Database, Search, Download } from 'lucide-react';

const resources = [
  { label: 'Print Books', count: '85,000+' },
  { label: 'E-Books', count: '12,000+' },
  { label: 'E-Journals', count: '5,000+' },
  { label: 'Project Reports', count: '8,500+' },
  { label: 'Magazines', count: '120+' },
  { label: 'Newspapers', count: '15' },
];

const databases = [
  { name: 'IEEE Xplore', desc: 'Access to IEEE journals, conferences, and standards', active: true },
  { name: 'Springer Nature', desc: 'Scientific & engineering journals and books', active: true },
  { name: 'DELNET', desc: 'Developing Library Network for inter-library loans', active: true },
  { name: 'NPTEL', desc: 'National Programme on Technology Enhanced Learning', active: true },
  { name: 'J-Gate', desc: 'Electronic gateway to global e-journal literature', active: true },
];

export default function LibraryPage() {
  return (
    <div className="animate-fade-in space-y-10">
      {/* Overview */}
      <div className="feature-card p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center text-3xl flex-shrink-0">
            📚
          </div>
          <div>
            <h2 className="font-grotesk font-bold text-2xl mb-2">Central Library</h2>
            <p className="text-muted-foreground mb-4">
              The QISCET Central Library is a state-of-the-art facility spread across 2 floors with a seating capacity of 500+. 
              It provides access to a vast collection of books, journals, and digital resources to support academic excellence.
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-primary" /> Mon-Sat: 8 AM - 9 PM</div>
              <div className="flex items-center gap-2"><Wifi className="w-4 h-4 text-primary" /> Free Wi-Fi</div>
              <div className="flex items-center gap-2"><Database className="w-4 h-4 text-primary" /> Digital Access 24/7</div>
            </div>
          </div>
        </div>
      </div>

      {/* Resources */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4">Collection Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {resources.map(r => (
            <div key={r.label} className="feature-card text-center">
              <p className="text-2xl font-grotesk font-bold text-primary">{r.count}</p>
              <p className="text-xs text-muted-foreground mt-1">{r.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Digital Databases */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4">Digital Databases</h3>
        <div className="space-y-3">
          {databases.map(db => (
            <div key={db.name} className="feature-card flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">{db.name}</h4>
                <p className="text-xs text-muted-foreground">{db.desc}</p>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-green-500/10 text-green-600 font-medium">Active</span>
            </div>
          ))}
        </div>
      </div>

      {/* Services */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4">Library Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { icon: Search, title: 'OPAC Search', desc: 'Online Public Access Catalog for searching library collection' },
            { icon: BookOpen, title: 'Book Bank', desc: 'Semester-wise textbook lending for economically weaker students' },
            { icon: Download, title: 'E-Resource Access', desc: 'Remote access to e-journals and digital databases' },
            { icon: Database, title: 'Reprographic Service', desc: 'Photocopying, scanning, and printing facilities' },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="feature-card flex items-start gap-4">
              <Icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-sm">{title}</h4>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
