import { useState, useEffect, useMemo } from 'react';
import { Trophy, TrendingUp, Briefcase, Code2, GraduationCap, FileText, Sparkles, ChevronRight } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface ReadinessData {
  cgpa: number;
  skills: string[];
  internshipCount: number;
  resumeScore: number | null;
}

function calculateReadiness(data: ReadinessData) {
  // CGPA component (0-30)
  let cgpaScore = 0;
  if (data.cgpa >= 9) cgpaScore = 30;
  else if (data.cgpa >= 8) cgpaScore = 25;
  else if (data.cgpa >= 7) cgpaScore = 20;
  else if (data.cgpa >= 6) cgpaScore = 14;
  else cgpaScore = 8;

  // Skills component (0-25)
  const skillScore = Math.min(data.skills.length * 3, 25);

  // Internship component (0-20)
  const internScore = Math.min(data.internshipCount * 7, 20);

  // Resume component (0-25)
  const resumeScore = data.resumeScore ? Math.round(data.resumeScore * 0.25) : 0;

  const total = Math.min(cgpaScore + skillScore + internScore + resumeScore, 100);

  return {
    total,
    breakdown: { cgpa: cgpaScore, skills: skillScore, internships: internScore, resume: resumeScore },
    level: total >= 80 ? 'Excellent' : total >= 60 ? 'Good' : total >= 40 ? 'Developing' : 'Needs Work',
    color: total >= 80 ? 'text-green-500' : total >= 60 ? 'text-amber-500' : total >= 40 ? 'text-orange-500' : 'text-destructive',
    bgColor: total >= 80 ? 'from-green-500/20' : total >= 60 ? 'from-amber-500/20' : total >= 40 ? 'from-orange-500/20' : 'from-destructive/20',
    strokeColor: total >= 80 ? 'stroke-green-500' : total >= 60 ? 'stroke-amber-500' : total >= 40 ? 'stroke-orange-500' : 'stroke-destructive',
  };
}

function RadialGauge({ value, color, strokeColor }: { value: number; color: string; strokeColor: string }) {
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative w-52 h-52 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="10" opacity={0.3} />
        <circle cx="80" cy="80" r="70" fill="none" className={strokeColor} strokeWidth="10" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-grotesk font-bold text-5xl ${color}`}>{value}%</span>
        <span className="text-xs text-muted-foreground mt-1">Placement Ready</span>
      </div>
    </div>
  );
}

function BreakdownBar({ label, value, max, icon: Icon, color }: {
  label: string; value: number; max: number; icon: any; color: string;
}) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between text-xs mb-1">
          <span className="font-medium">{label}</span>
          <span className="text-muted-foreground">{value}/{max}</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${pct}%` }} />
        </div>
      </div>
    </div>
  );
}

export default function PlacementReadinessScore() {
  const { user } = useAuth();
  const [data, setData] = useState<ReadinessData>({
    cgpa: 0, skills: [], internshipCount: 0, resumeScore: null,
  });
  const [manualMode, setManualMode] = useState(false);
  const [manualSkills, setManualSkills] = useState('');
  const [manualCgpa, setManualCgpa] = useState(7.0);
  const [manualInternships, setManualInternships] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Try to fetch from DB
  useEffect(() => {
    if (!user?.id) { setManualMode(true); setLoaded(true); return; }

    const fetchData = async () => {
      const { data: student } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', user.id)
        .limit(1)
        .single();

      if (!student) { setManualMode(true); setLoaded(true); return; }

      setData({
        cgpa: student.cgpa || 0,
        skills: [], // Skills would come from student profile
        internshipCount: 0,
        resumeScore: null,
      });
      setManualCgpa(student.cgpa || 0);
      setLoaded(true);
    };
    fetchData();
  }, [user?.id]);

  const effectiveData = useMemo<ReadinessData>(() => {
    if (manualMode || !loaded) {
      return {
        cgpa: manualCgpa,
        skills: manualSkills.split(',').map(s => s.trim()).filter(Boolean),
        internshipCount: manualInternships,
        resumeScore: null,
      };
    }
    return {
      ...data,
      skills: manualSkills ? manualSkills.split(',').map(s => s.trim()).filter(Boolean) : data.skills,
      internshipCount: manualInternships || data.internshipCount,
    };
  }, [manualMode, loaded, manualCgpa, manualSkills, manualInternships, data]);

  const result = useMemo(() => calculateReadiness(effectiveData), [effectiveData]);

  const tips = useMemo(() => {
    const t: string[] = [];
    if (result.breakdown.cgpa < 20) t.push('Aim for CGPA 7.0+ to meet most company cutoffs');
    if (result.breakdown.skills < 12) t.push('Add 4-5 in-demand skills like React, Python, SQL, Cloud');
    if (result.breakdown.internships < 7) t.push('Complete at least 1 internship before placement season');
    if (result.breakdown.resume === 0) t.push('Build your resume in the Resume Builder to boost your score');
    return t;
  }, [result]);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Trophy className="w-4 h-4" />
            Signature Feature
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-3">
            Placement <span className="gradient-text">Readiness Score</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive score combining your CGPA, skills, internships, and resume quality to gauge your placement readiness.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-5">
            <div className="feature-card">
              <h3 className="font-grotesk font-semibold text-sm mb-4 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-primary" /> Your Profile
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium mb-1.5">CGPA (0-10)</label>
                  <input type="number" min={0} max={10} step={0.1} value={manualCgpa}
                    onChange={e => { setManualCgpa(parseFloat(e.target.value) || 0); setManualMode(true); }}
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
                  />
                  <input type="range" min={0} max={10} step={0.1} value={manualCgpa}
                    onChange={e => { setManualCgpa(parseFloat(e.target.value)); setManualMode(true); }}
                    className="w-full mt-1.5 accent-[hsl(var(--primary))]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Skills (comma-separated)</label>
                  <textarea rows={2} value={manualSkills}
                    onChange={e => setManualSkills(e.target.value)}
                    placeholder="React, Python, SQL, Machine Learning..."
                    className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium mb-1.5">Internships Completed</label>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3].map(n => (
                      <button key={n} onClick={() => setManualInternships(n)}
                        className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                          manualInternships === n ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >{n}{n === 3 ? '+' : ''}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Tips */}
            {tips.length > 0 && (
              <div className="feature-card border-primary/20">
                <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-primary" /> Boost Your Score
                </h4>
                <div className="space-y-2">
                  {tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm">
                      <ChevronRight className="w-3.5 h-3.5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Score Display */}
          <div className="lg:col-span-3 space-y-6">
            <div className="feature-card text-center py-8">
              <RadialGauge value={result.total} color={result.color} strokeColor={result.strokeColor} />
              <div className="mt-4">
                <span className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold ${result.color} bg-muted`}>
                  <TrendingUp className="w-4 h-4" />
                  {result.level}
                </span>
              </div>
            </div>

            {/* Breakdown */}
            <div className="feature-card">
              <h4 className="font-grotesk font-semibold text-sm mb-5">Score Breakdown</h4>
              <div className="space-y-4">
                <BreakdownBar label="CGPA" value={result.breakdown.cgpa} max={30} icon={GraduationCap} color="bg-blue-500/10 text-blue-500" />
                <BreakdownBar label="Skills" value={result.breakdown.skills} max={25} icon={Code2} color="bg-green-500/10 text-green-500" />
                <BreakdownBar label="Internships" value={result.breakdown.internships} max={20} icon={Briefcase} color="bg-purple-500/10 text-purple-500" />
                <BreakdownBar label="Resume" value={result.breakdown.resume} max={25} icon={FileText} color="bg-amber-500/10 text-amber-500" />
              </div>
            </div>

            {/* Comparison */}
            <div className="feature-card">
              <h4 className="font-grotesk font-semibold text-sm mb-4">Where You Stand</h4>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { label: 'Below Average', range: '0-40%', highlight: result.total < 40 },
                  { label: 'Average', range: '40-70%', highlight: result.total >= 40 && result.total < 70 },
                  { label: 'Placement Ready', range: '70-100%', highlight: result.total >= 70 },
                ].map(tier => (
                  <div key={tier.label} className={`p-3 rounded-xl transition-all ${
                    tier.highlight ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted'
                  }`}>
                    <p className={`text-lg font-bold ${tier.highlight ? 'text-primary' : 'text-muted-foreground'}`}>{tier.range}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{tier.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
