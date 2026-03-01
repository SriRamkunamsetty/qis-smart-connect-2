import { useState } from 'react';
import { Target, Sparkles, CheckCircle2, XCircle, BookOpen, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DREAM_COMPANIES = [
  { name: 'Google', logo: '🔍' },
  { name: 'Microsoft', logo: '🪟' },
  { name: 'Amazon', logo: '📦' },
  { name: 'Apple', logo: '🍎' },
  { name: 'Meta', logo: '🌐' },
  { name: 'Netflix', logo: '🎬' },
  { name: 'Adobe', logo: '🎨' },
  { name: 'Salesforce', logo: '☁️' },
  { name: 'TCS', logo: '🏢' },
  { name: 'Infosys', logo: '🔷' },
  { name: 'Wipro', logo: '🌿' },
  { name: 'Deloitte', logo: '📊' },
];

interface SkillGapResult {
  matchPercentage: number;
  matchedSkills: string[];
  missingSkills: string[];
  recommendations: string[];
  learningPath: { skill: string; resource: string; timeEstimate: string }[];
}

export default function SkillGapAnalysis() {
  const [skills, setSkills] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [company, setCompany] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SkillGapResult | null>(null);
  const { toast } = useToast();

  const analyze = async () => {
    if (!skills.trim() || !company) {
      toast({ title: 'Missing info', description: 'Enter your skills and select a company.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    setResult(null);
    try {
      // TODO: Replace with Firebase Cloud Function call
      toast({ title: 'Coming Soon', description: 'AI Skill Gap Analysis will be available once Firebase functions are configured.' });
    } catch (err: any) {
      toast({ title: 'Analysis failed', description: err.message || 'Please try again.', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Target className="w-4 h-4" />
            AI-Powered Analysis
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-3">
            Skill Gap <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your dream company and see how your skills stack up against their requirements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-6">
            <div className="feature-card">
              <h3 className="font-grotesk font-semibold mb-4">Your Skills</h3>
              <textarea
                rows={3}
                value={skills}
                onChange={e => setSkills(e.target.value)}
                placeholder="React, Python, SQL, Machine Learning, Git..."
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm resize-none"
              />
              <div className="mt-3">
                <label className="block text-sm font-medium mb-2">Branch</label>
                <select value={branch} onChange={e => setBranch(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm">
                  {['CSE', 'ECE', 'MECH', 'CIVIL'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="feature-card">
              <h3 className="font-grotesk font-semibold mb-4">Dream Company</h3>
              <div className="grid grid-cols-3 gap-2">
                {DREAM_COMPANIES.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setCompany(c.name)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      company === c.name
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <span>{c.logo}</span> {c.name}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={analyze} disabled={loading} className="btn-primary w-full justify-center">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Analyzing...' : 'Analyze Skill Gap'}
            </button>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {result ? (
              <>
                {/* Match % */}
                <div className="feature-card text-center">
                  <div className="relative w-32 h-32 mx-auto mb-3">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
                      <circle cx="60" cy="60" r="52" fill="none"
                        className={result.matchPercentage >= 70 ? 'stroke-green-500' : result.matchPercentage >= 40 ? 'stroke-amber-500' : 'stroke-red-500'}
                        strokeWidth="8" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 52}`}
                        strokeDashoffset={`${2 * Math.PI * 52 * (1 - result.matchPercentage / 100)}`}
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-grotesk font-bold text-2xl">{result.matchPercentage}%</span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Match with {company}</p>
                </div>

                {/* Matched Skills */}
                {result.matchedSkills.length > 0 && (
                  <div className="feature-card">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <CheckCircle2 className="w-4 h-4 text-green-500" /> Skills You Have
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.matchedSkills.map(s => (
                        <span key={s} className="px-3 py-1 rounded-lg bg-green-500/10 text-green-700 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Missing Skills */}
                {result.missingSkills.length > 0 && (
                  <div className="feature-card">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <XCircle className="w-4 h-4 text-red-500" /> Skills to Learn
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {result.missingSkills.map(s => (
                        <span key={s} className="px-3 py-1 rounded-lg bg-red-500/10 text-red-700 text-xs font-medium">{s}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Learning Path */}
                {result.learningPath && result.learningPath.length > 0 && (
                  <div className="feature-card">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <BookOpen className="w-4 h-4 text-primary" /> Learning Path
                    </h4>
                    <div className="space-y-3">
                      {result.learningPath.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-muted">
                          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{i + 1}</div>
                          <div>
                            <p className="text-sm font-medium">{item.skill}</p>
                            <p className="text-xs text-muted-foreground">{item.resource}</p>
                            <p className="text-xs text-primary mt-0.5">⏱ {item.timeEstimate}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                {result.recommendations && result.recommendations.length > 0 && (
                  <div className="feature-card">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <AlertCircle className="w-4 h-4 text-amber-500" /> Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((r, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className="text-amber-500 mt-0.5">→</span> {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <div className="feature-card text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-grotesk font-semibold mb-2">Select & Analyze</h3>
                <p className="text-sm text-muted-foreground max-w-[220px] mx-auto">
                  Enter your skills, pick a dream company, and discover what you need to learn.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
