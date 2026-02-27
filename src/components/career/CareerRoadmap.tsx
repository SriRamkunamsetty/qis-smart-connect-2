import { useState } from 'react';
import { Map, Sparkles, Loader2, BookOpen, Award, Briefcase, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const CAREER_GOALS = [
  'Data Scientist', 'Full Stack Developer', 'Machine Learning Engineer',
  'Cloud Architect', 'Cybersecurity Analyst', 'DevOps Engineer',
  'Product Manager', 'UI/UX Designer', 'Blockchain Developer',
  'AI Research Scientist', 'Mobile App Developer', 'Game Developer',
];

interface RoadmapResult {
  title: string;
  stages: {
    phase: string;
    duration: string;
    skills: string[];
    courses: string[];
    certifications: string[];
    activities: string[];
  }[];
  internshipTypes: string[];
  expectedSalary: { entry: string; mid: string; senior: string };
}

export default function CareerRoadmap() {
  const [goal, setGoal] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [skills, setSkills] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RoadmapResult | null>(null);
  const { toast } = useToast();

  const generate = async () => {
    if (!goal) { toast({ title: 'Select a career goal', variant: 'destructive' }); return; }
    setLoading(true);
    setResult(null);
    try {
      const { data, error } = await supabase.functions.invoke('score-resume', {
        body: { resume: { careerGoal: goal, branch, skills }, action: 'career-roadmap' },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);
      setResult(data);
    } catch (err: any) {
      toast({ title: 'Failed', description: err.message, variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Map className="w-4 h-4" />
            AI Career Planning
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-3">
            Career <span className="gradient-text">Roadmap</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your dream career and get a personalized roadmap with skills, courses, and certifications.
          </p>
        </div>

        {/* Goal selection */}
        <div className="feature-card mb-8">
          <h3 className="font-grotesk font-semibold mb-4">I want to become a...</h3>
          <div className="flex flex-wrap gap-2 mb-6">
            {CAREER_GOALS.map(g => (
              <button
                key={g}
                onClick={() => setGoal(g)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  goal === g ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {g}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Branch</label>
              <select value={branch} onChange={e => setBranch(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm">
                {['CSE', 'ECE', 'MECH', 'CIVIL'].map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Current Skills (optional)</label>
              <input
                type="text" value={skills} onChange={e => setSkills(e.target.value)}
                placeholder="Python, React, SQL..."
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
              />
            </div>
          </div>
          <button onClick={generate} disabled={loading} className="btn-primary w-full justify-center mt-6">
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Generating Roadmap...' : 'Generate My Roadmap'}
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-8">
            <h2 className="font-grotesk font-bold text-2xl text-center">
              Roadmap to <span className="gradient-text">{result.title}</span>
            </h2>

            {/* Salary expectations */}
            {result.expectedSalary && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Entry Level', value: result.expectedSalary.entry, icon: DollarSign },
                  { label: 'Mid Level', value: result.expectedSalary.mid, icon: Briefcase },
                  { label: 'Senior Level', value: result.expectedSalary.senior, icon: Award },
                ].map(s => (
                  <div key={s.label} className="feature-card text-center">
                    <s.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="font-grotesk font-bold text-lg">{s.value}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Stages */}
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
              <div className="space-y-8">
                {result.stages.map((stage, i) => (
                  <div key={i} className="relative pl-16">
                    <div className="absolute left-4 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold -translate-x-1/2">
                      {i + 1}
                    </div>
                    <div className="feature-card">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-grotesk font-semibold">{stage.phase}</h3>
                        <span className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">{stage.duration}</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stage.skills.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">🛠 Skills to Learn</p>
                            <div className="flex flex-wrap gap-1.5">
                              {stage.skills.map(s => (
                                <span key={s} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">{s}</span>
                              ))}
                            </div>
                          </div>
                        )}
                        {stage.courses.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">📚 Courses</p>
                            <ul className="space-y-1">
                              {stage.courses.map(c => (
                                <li key={c} className="text-xs text-muted-foreground flex items-start gap-1">
                                  <BookOpen className="w-3 h-3 mt-0.5 flex-shrink-0" /> {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {stage.certifications.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">🏅 Certifications</p>
                            <ul className="space-y-1">
                              {stage.certifications.map(c => (
                                <li key={c} className="text-xs text-muted-foreground flex items-start gap-1">
                                  <Award className="w-3 h-3 mt-0.5 flex-shrink-0" /> {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        {stage.activities.length > 0 && (
                          <div>
                            <p className="text-xs font-medium text-muted-foreground mb-2">🎯 Activities</p>
                            <ul className="space-y-1">
                              {stage.activities.map(a => (
                                <li key={a} className="text-xs text-muted-foreground">→ {a}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Internship types */}
            {result.internshipTypes && result.internshipTypes.length > 0 && (
              <div className="feature-card">
                <h3 className="font-grotesk font-semibold mb-3">Recommended Internship Types</h3>
                <div className="flex flex-wrap gap-2">
                  {result.internshipTypes.map(t => (
                    <span key={t} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
