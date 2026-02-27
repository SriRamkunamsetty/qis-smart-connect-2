import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Clock, BookOpen, FileText } from 'lucide-react';
import { extendedFaculty } from '@/data/extendedData';

export default function FacultyProfile() {
  const { id } = useParams();
  const faculty = extendedFaculty.find(f => f.id === Number(id));

  if (!faculty) {
    return (
      <div className="min-h-screen pt-28 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-semibold">Faculty not found</p>
          <Link to="/faculty" className="btn-primary mt-4 inline-flex">Back to Faculty</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-3xl">
        <Link to="/faculty" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Faculty
        </Link>

        <div className="feature-card p-8">
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-8">
            <img src={faculty.image} alt={faculty.name} className="w-24 h-24 rounded-2xl object-cover" />
            <div>
              <h1 className="font-grotesk font-bold text-2xl">{faculty.name}</h1>
              <p className="text-primary font-medium mt-1">{faculty.role}</p>
              <p className="text-sm text-muted-foreground">{faculty.deptFull}</p>
              <p className="text-sm text-muted-foreground mt-1">Experience: {faculty.experience}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Qualifications</h3>
                </div>
                <ul className="space-y-1.5">
                  {faculty.qualifications.map(q => (
                    <li key={q} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" /> {q}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-primary" />
                  <h3 className="font-semibold text-sm">Publications</h3>
                </div>
                <p className="text-sm text-muted-foreground">{faculty.publications} research papers</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm mb-2">Subjects Handled</h3>
                <div className="flex flex-wrap gap-2">
                  {faculty.subjects.map(s => (
                    <span key={s} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" /> {faculty.officeHours}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" /> {faculty.email}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
