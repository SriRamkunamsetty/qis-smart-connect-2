import { FlaskConical, FileText, Award, Globe } from 'lucide-react';

const publications = [
  { title: 'Deep Learning for Medical Image Segmentation', authors: 'Dr. Priya Sharma, Dr. S. Kumar', journal: 'IEEE Trans. on Medical Imaging', year: 2024, citations: 45 },
  { title: 'IoT-based Smart Agriculture Monitoring System', authors: 'Prof. Rajan Mehta, Dr. A. Patel', journal: 'Elsevier - Computers & Electronics in Agriculture', year: 2024, citations: 32 },
  { title: 'Structural Health Monitoring using Sensor Networks', authors: 'Dr. Suresh Kumar', journal: 'ASCE Journal of Structural Engineering', year: 2023, citations: 28 },
  { title: 'VLSI Design for Low-Power Neural Networks', authors: 'Prof. Rajan Mehta', journal: 'Springer - Journal of Electronic Testing', year: 2023, citations: 19 },
  { title: 'Renewable Energy Integration in Smart Grids', authors: 'Dr. Anita Patel, Dr. V. Rao', journal: 'IEEE Power & Energy Society', year: 2024, citations: 38 },
];

const patents = [
  { title: 'Automated Crop Disease Detection using Computer Vision', number: 'IN202441023456', year: 2024, status: 'Granted' },
  { title: 'IoT-based Water Quality Monitoring Device', number: 'IN202341098765', year: 2023, status: 'Granted' },
  { title: 'AI-Powered Student Performance Predictor', number: 'IN202541001234', year: 2025, status: 'Filed' },
];

const conferences = [
  { name: 'International Conference on AI & ML (ICAIML 2024)', date: 'March 2024', papers: 12 },
  { name: 'IEEE Conference on IoT & Smart Systems', date: 'July 2024', papers: 8 },
  { name: 'National Conference on Sustainable Engineering', date: 'September 2024', papers: 15 },
];

export default function ResearchPage() {
  return (
    <div className="animate-fade-in space-y-10">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: FileText, label: 'Publications', value: '320+' },
          { icon: Award, label: 'Patents', value: '18' },
          { icon: Globe, label: 'Conferences', value: '45+' },
          { icon: FlaskConical, label: 'Funded Projects', value: '₹4.2 Cr' },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="feature-card text-center">
            <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
            <p className="text-2xl font-grotesk font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Publications */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4">Recent Publications</h3>
        <div className="space-y-3">
          {publications.map((pub, i) => (
            <div key={i} className="feature-card">
              <h4 className="font-medium text-sm mb-1">{pub.title}</h4>
              <p className="text-xs text-muted-foreground">{pub.authors}</p>
              <div className="flex items-center gap-3 mt-2 text-xs">
                <span className="text-primary">{pub.journal}</span>
                <span className="text-muted-foreground">({pub.year})</span>
                <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">{pub.citations} citations</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Patents */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4">Patents</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {patents.map((p, i) => (
            <div key={i} className="feature-card">
              <h4 className="font-medium text-sm mb-1">{p.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{p.number}</p>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">{p.year}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full ${p.status === 'Granted' ? 'bg-green-500/10 text-green-600' : 'bg-amber-500/10 text-amber-600'}`}>{p.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Conferences */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4">Conferences Organized</h3>
        <div className="space-y-3">
          {conferences.map((c, i) => (
            <div key={i} className="feature-card flex items-center justify-between">
              <div>
                <h4 className="font-medium text-sm">{c.name}</h4>
                <p className="text-xs text-muted-foreground">{c.date}</p>
              </div>
              <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{c.papers} papers</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
