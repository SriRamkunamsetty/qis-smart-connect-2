import { useState } from 'react';
import { departments, faculty } from '../data/dummyData';
import { Download, ChevronDown, ChevronUp, Users, BookOpen } from 'lucide-react';

export default function Academics() {
  const [activeDept, setActiveDept] = useState('cse');
  const [expanded, setExpanded] = useState<string | null>(null);

  const dept = departments.find(d => d.id === activeDept);
  const deptFaculty = faculty.filter(f => f.dept === activeDept);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <h1 className="section-title mb-4">Academic <span className="gradient-text">Excellence</span></h1>
          <p className="section-subtitle">Explore our world-class programs designed for tomorrow's leaders</p>
        </div>

        {/* Department Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {departments.map(d => (
            <button
              key={d.id}
              onClick={() => setActiveDept(d.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeDept === d.id
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              <span className="mr-2">{d.icon}</span>
              {d.shortName}
            </button>
          ))}
        </div>

        {dept && (
          <div className="animate-fade-in">
            {/* Dept Overview */}
            <div className="feature-card mb-8 p-8">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${dept.color} flex items-center justify-center text-3xl flex-shrink-0`}>
                  {dept.icon}
                </div>
                <div className="flex-1">
                  <h2 className="font-grotesk font-bold text-2xl mb-2">{dept.name}</h2>
                  <p className="text-muted-foreground mb-5">{dept.description}</p>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{dept.students.toLocaleString()} Students</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="w-4 h-4 text-primary" />
                      <span>{dept.faculty} Faculty Members</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
              <div>
                <h3 className="font-grotesk font-semibold text-lg mb-4">Programs Offered</h3>
                <div className="space-y-3">
                  {dept.courses.map((course, i) => (
                    <div key={course} className="feature-card">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpanded(expanded === `${activeDept}-${i}` ? null : `${activeDept}-${i}`)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="text-primary text-sm font-bold">{i + 1}</span>
                          </div>
                          <span className="font-medium text-sm">{course}</span>
                        </div>
                        {expanded === `${activeDept}-${i}` ? (
                          <ChevronUp className="w-4 h-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground" />
                        )}
                      </div>
                      {expanded === `${activeDept}-${i}` && (
                        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                          <p className="text-sm text-muted-foreground mb-3">
                            4-year program with strong industry exposure, research opportunities, and 100% placement assistance.
                          </p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {['AI/ML', 'Cloud', 'Security', 'DevOps'].map(tag => (
                              <span key={tag} className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary">{tag}</span>
                            ))}
                          </div>
                          <button className="btn-outline text-xs px-4 py-2 flex items-center gap-2">
                            <Download className="w-3.5 h-3.5" />
                            Download Syllabus
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Faculty */}
              <div>
                <h3 className="font-grotesk font-semibold text-lg mb-4">Faculty Spotlight</h3>
                {deptFaculty.length > 0 ? (
                  <div className="space-y-3">
                    {deptFaculty.map(f => (
                      <div key={f.id} className="feature-card flex items-center gap-4 group">
                        <img
                          src={f.image}
                          alt={f.name}
                          className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div>
                          <p className="font-medium text-sm">{f.name}</p>
                          <p className="text-xs text-muted-foreground">{f.role}</p>
                          <p className="text-xs text-primary mt-0.5">{f.experience} experience</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="feature-card text-center py-10">
                    <p className="text-muted-foreground text-sm">Faculty details coming soon</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
