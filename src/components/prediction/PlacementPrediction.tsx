import { useState, useMemo } from 'react';
import { TrendingUp, Target, Lightbulb, ChevronRight, Sparkles, BarChart3, GraduationCap, Briefcase, Code2, Award } from 'lucide-react';

const SKILL_OPTIONS = [
  'Python', 'Java', 'C++', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'SQL',
  'Machine Learning', 'Data Structures', 'Algorithms', 'Cloud Computing', 'Docker',
  'Git', 'REST APIs', 'MongoDB', 'PostgreSQL', 'TensorFlow', 'AWS', 'Linux',
  'System Design', 'Communication', 'Leadership', 'Problem Solving', 'Teamwork',
];

const CERTIFICATIONS = [
  'AWS Certified', 'Google Cloud', 'Azure', 'Cisco CCNA', 'Oracle Java',
  'TensorFlow Developer', 'Kubernetes', 'Scrum Master', 'PMP', 'None',
];

interface PredictionResult {
  probability: number;
  packageRange: { min: number; max: number };
  strengths: string[];
  improvements: string[];
  suggestedCompanies: string[];
  riskFactors: string[];
}

function calculatePrediction(
  cgpa: number,
  skills: string[],
  internships: number,
  projects: number,
  certifications: string[],
  branch: string,
  backlogs: number,
): PredictionResult {
  // Base score from CGPA (0-35 points)
  let score = 0;
  if (cgpa >= 9.0) score += 35;
  else if (cgpa >= 8.0) score += 30;
  else if (cgpa >= 7.0) score += 24;
  else if (cgpa >= 6.5) score += 18;
  else if (cgpa >= 6.0) score += 12;
  else score += 6;

  // Skills score (0-25 points)
  const technicalSkills = skills.filter(s => !['Communication', 'Leadership', 'Problem Solving', 'Teamwork'].includes(s));
  const softSkills = skills.filter(s => ['Communication', 'Leadership', 'Problem Solving', 'Teamwork'].includes(s));
  score += Math.min(technicalSkills.length * 2.5, 18);
  score += Math.min(softSkills.length * 1.75, 7);

  // Internship score (0-20 points)
  score += Math.min(internships * 7, 20);

  // Projects score (0-10 points)
  score += Math.min(projects * 2.5, 10);

  // Certifications score (0-10 points)
  const validCerts = certifications.filter(c => c !== 'None');
  score += Math.min(validCerts.length * 3.5, 10);

  // Branch modifier
  const branchModifiers: Record<string, number> = { CSE: 5, ECE: 3, MECH: 0, CIVIL: -2 };
  score += branchModifiers[branch] ?? 0;

  // Backlog penalty
  score -= backlogs * 8;

  // Clamp to 0-100
  const probability = Math.max(5, Math.min(98, score));

  // Package range
  const basePackage = cgpa >= 8 ? 6 : cgpa >= 7 ? 4.5 : 3.5;
  const skillBonus = technicalSkills.length * 0.3;
  const internBonus = internships * 0.8;
  const min = Math.round((basePackage + skillBonus * 0.3 + internBonus * 0.3) * 10) / 10;
  const max = Math.round((basePackage + skillBonus + internBonus + validCerts.length * 0.5) * 10) / 10;

  // Strengths
  const strengths: string[] = [];
  if (cgpa >= 8) strengths.push('Strong academic record');
  if (technicalSkills.length >= 5) strengths.push('Diverse technical skillset');
  if (internships >= 2) strengths.push('Good industry exposure');
  if (softSkills.length >= 2) strengths.push('Well-rounded soft skills');
  if (projects >= 3) strengths.push('Solid project portfolio');
  if (validCerts.length >= 1) strengths.push('Industry certifications');

  // Improvements
  const improvements: string[] = [];
  if (cgpa < 7) improvements.push('Focus on improving CGPA above 7.0 — many companies have this as a cutoff');
  if (technicalSkills.length < 4) improvements.push('Learn at least 4-5 technical skills relevant to your branch');
  if (internships === 0) improvements.push('Complete at least 1 internship before placement season');
  if (softSkills.length === 0) improvements.push('Develop communication and leadership skills through clubs/events');
  if (projects < 2) improvements.push('Build 2-3 meaningful projects to showcase on your resume');
  if (validCerts.length === 0) improvements.push('Get at least one industry-recognized certification');
  if (backlogs > 0) improvements.push('Clear all backlogs — companies often have zero-backlog policies');
  if (!skills.includes('Data Structures') || !skills.includes('Algorithms')) improvements.push('Master Data Structures & Algorithms for coding rounds');

  // Suggested companies based on profile
  const suggestedCompanies: string[] = [];
  if (probability >= 80) suggestedCompanies.push('Google', 'Microsoft', 'Amazon', 'Adobe');
  else if (probability >= 60) suggestedCompanies.push('TCS Digital', 'Infosys Power Programmer', 'Wipro Elite', 'Cognizant GenC Pro');
  else if (probability >= 40) suggestedCompanies.push('TCS', 'Infosys', 'Wipro', 'Cognizant');
  else suggestedCompanies.push('Local IT firms', 'Startups', 'Service companies');

  // Risk factors
  const riskFactors: string[] = [];
  if (backlogs > 0) riskFactors.push(`${backlogs} active backlog(s) may disqualify from many drives`);
  if (cgpa < 6) riskFactors.push('CGPA below most company cutoffs');
  if (internships === 0 && projects < 2) riskFactors.push('No practical experience to demonstrate');

  return { probability, packageRange: { min, max }, strengths, improvements, suggestedCompanies, riskFactors };
}

function ProbabilityGauge({ value }: { value: number }) {
  const color = value >= 75 ? 'text-green-500' : value >= 50 ? 'text-amber-500' : 'text-red-500';
  const bgColor = value >= 75 ? 'from-green-500/20 to-green-500/5' : value >= 50 ? 'from-amber-500/20 to-amber-500/5' : 'from-red-500/20 to-red-500/5';
  const strokeColor = value >= 75 ? 'stroke-green-500' : value >= 50 ? 'stroke-amber-500' : 'stroke-red-500';

  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className={`relative w-48 h-48 mx-auto bg-gradient-to-b ${bgColor} rounded-full flex items-center justify-center`}>
      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 160 160">
        <circle cx="80" cy="80" r="70" fill="none" stroke="hsl(var(--border))" strokeWidth="8" />
        <circle
          cx="80" cy="80" r="70" fill="none"
          className={strokeColor}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
        />
      </svg>
      <div className="text-center z-10">
        <span className={`font-grotesk font-bold text-4xl ${color}`}>{value}%</span>
        <p className="text-xs text-muted-foreground mt-1">Placement Probability</p>
      </div>
    </div>
  );
}

export default function PlacementPrediction() {
  const [cgpa, setCgpa] = useState(7.5);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [internshipCount, setInternshipCount] = useState(0);
  const [projectCount, setProjectCount] = useState(1);
  const [selectedCerts, setSelectedCerts] = useState<string[]>([]);
  const [branch, setBranch] = useState('CSE');
  const [backlogs, setBacklogs] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const toggleCert = (cert: string) => {
    setSelectedCerts(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const result = useMemo(() => {
    if (!showResult) return null;
    return calculatePrediction(cgpa, selectedSkills, internshipCount, projectCount, selectedCerts, branch, backlogs);
  }, [showResult, cgpa, selectedSkills, internshipCount, projectCount, selectedCerts, branch, backlogs]);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            AI-Powered Prediction
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-3">
            Placement <span className="gradient-text">Prediction Engine</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter your academic and skill profile to get a personalized placement probability score with actionable improvement suggestions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-3 space-y-6">
            {/* CGPA & Branch */}
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-grotesk font-semibold">Academics</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">CGPA</label>
                  <input
                    type="number" min={0} max={10} step={0.1}
                    value={cgpa}
                    onChange={e => setCgpa(parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  />
                  <div className="w-full mt-2">
                    <input type="range" min={0} max={10} step={0.1} value={cgpa} onChange={e => setCgpa(parseFloat(e.target.value))} className="w-full accent-[hsl(var(--primary))]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Branch</label>
                  <select
                    value={branch}
                    onChange={e => setBranch(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
                  >
                    {['CSE', 'ECE', 'MECH', 'CIVIL'].map(b => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Active Backlogs</label>
                  <input
                    type="number" min={0} max={10}
                    value={backlogs}
                    onChange={e => setBacklogs(parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <Code2 className="w-5 h-5 text-blue-500" />
                </div>
                <h3 className="font-grotesk font-semibold">Skills</h3>
                <span className="ml-auto text-xs text-muted-foreground">{selectedSkills.length} selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map(skill => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedSkills.includes(skill)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="font-grotesk font-semibold">Experience</h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Internships Completed</label>
                  <div className="flex items-center gap-3">
                    {[0, 1, 2, 3].map(n => (
                      <button
                        key={n}
                        onClick={() => setInternshipCount(n)}
                        className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${
                          internshipCount === n
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {n}{n === 3 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Projects Built</label>
                  <div className="flex items-center gap-3">
                    {[0, 1, 2, 3, 4].map(n => (
                      <button
                        key={n}
                        onClick={() => setProjectCount(n)}
                        className={`w-12 h-12 rounded-xl text-sm font-semibold transition-all ${
                          projectCount === n
                            ? 'bg-primary text-primary-foreground shadow-sm'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {n}{n === 4 ? '+' : ''}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="feature-card">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-purple-500" />
                </div>
                <h3 className="font-grotesk font-semibold">Certifications</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {CERTIFICATIONS.map(cert => (
                  <button
                    key={cert}
                    onClick={() => toggleCert(cert)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      selectedCerts.includes(cert)
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>

            {/* Predict Button */}
            <button
              onClick={() => setShowResult(true)}
              className="btn-primary w-full justify-center text-base py-4"
            >
              <TrendingUp className="w-5 h-5" />
              Predict My Placement Chances
            </button>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {result ? (
              <>
                {/* Probability Gauge */}
                <div className="feature-card text-center">
                  <ProbabilityGauge value={result.probability} />
                  <div className="mt-4 flex items-center justify-center gap-2 text-sm">
                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Expected Package:</span>
                    <span className="font-semibold text-foreground">₹{result.packageRange.min} - {result.packageRange.max} LPA</span>
                  </div>
                </div>

                {/* Strengths */}
                {result.strengths.length > 0 && (
                  <div className="feature-card">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <Target className="w-4 h-4 text-green-500" />
                      Your Strengths
                    </h4>
                    <div className="space-y-2">
                      {result.strengths.map(s => (
                        <div key={s} className="flex items-start gap-2 text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Risk Factors */}
                {result.riskFactors.length > 0 && (
                  <div className="feature-card border-destructive/30">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <span className="text-destructive">⚠️</span>
                      Risk Factors
                    </h4>
                    <div className="space-y-2">
                      {result.riskFactors.map(r => (
                        <div key={r} className="flex items-start gap-2 text-sm text-destructive">
                          <div className="w-1.5 h-1.5 rounded-full bg-destructive mt-1.5 flex-shrink-0" />
                          <span>{r}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Improvements */}
                {result.improvements.length > 0 && (
                  <div className="feature-card">
                    <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-amber-500" />
                      Improvement Areas
                    </h4>
                    <div className="space-y-3">
                      {result.improvements.map(imp => (
                        <div key={imp} className="flex items-start gap-2 text-sm">
                          <ChevronRight className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{imp}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Suggested Companies */}
                <div className="feature-card">
                  <h4 className="font-grotesk font-semibold text-sm flex items-center gap-2 mb-3">
                    <Briefcase className="w-4 h-4 text-primary" />
                    Target Companies
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedCompanies.map(c => (
                      <span key={c} className="px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-medium">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="feature-card text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-grotesk font-semibold mb-2">Enter Your Profile</h3>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">
                  Fill in your details and click predict to see your placement probability.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
