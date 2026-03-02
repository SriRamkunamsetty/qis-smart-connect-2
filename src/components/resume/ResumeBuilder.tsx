import { useState, useMemo } from 'react';
import { Download, FileText, Eye, EyeOff, Image, GripVertical, Sparkles, Loader2, AlertTriangle, Palette, Type } from 'lucide-react';
import QRCode from 'react-qr-code';
import ResumePreview from './ResumePreview';
import type { ResumeData, SectionConfig, TemplateKey } from './ResumePreview';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// AI features will use Firebase Cloud Functions
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const defaultSections: ResumeData['sections'] = {
  summary: { visible: true, order: 0 },
  education: { visible: true, order: 1 },
  experience: { visible: true, order: 2 },
  skills: { visible: true, order: 3 },
  projects: { visible: true, order: 4 },
};

const emptyData: ResumeData = {
  name: '', email: '', phone: '', summary: '',
  education: '', skills: '', projects: '', experience: '',
  photo: undefined,
  skillLevels: {},
  accentColor: '#3b82f6',
  fontFamily: 'sans-serif',
  sections: { ...defaultSections },
};

type SectionKey = keyof ResumeData['sections'];

const sectionLabels: Record<SectionKey, string> = {
  summary: 'Professional Summary',
  education: 'Education',
  experience: 'Experience',
  skills: 'Skills',
  projects: 'Projects',
};

const BRANCH_SKILL_SUGGESTIONS: Record<string, string[]> = {
  CSE: ['Data Structures', 'Algorithms', 'React', 'Node.js', 'Python', 'SQL', 'Git', 'Machine Learning', 'REST APIs', 'Docker'],
  ECE: ['Embedded Systems', 'VLSI', 'MATLAB', 'IoT', 'Signal Processing', 'Arduino', 'PCB Design', 'Verilog', 'C/C++', 'Linux'],
  MECH: ['AutoCAD', 'SolidWorks', 'ANSYS', 'MATLAB', 'CNC Programming', '3D Printing', 'Thermodynamics', 'FEA', 'GD&T', 'Lean Manufacturing'],
  CIVIL: ['AutoCAD', 'STAAD Pro', 'Revit', 'ETABS', 'Primavera', 'Surveying', 'GIS', 'MATLAB', 'Project Management', 'BIM'],
};

const ACCENT_COLORS = ['#3b82f6', '#e74c3c', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4', '#1e3a5f'];
const FONT_OPTIONS = [
  { value: 'sans-serif', label: 'Sans Serif' },
  { value: 'serif', label: 'Serif' },
  { value: 'monospace', label: 'Monospace' },
  { value: 'Georgia, serif', label: 'Georgia' },
  { value: 'system-ui', label: 'System UI' },
];

const templates: { key: TemplateKey; label: string; desc: string; forRole?: string }[] = [
  { key: 'modern', label: 'Modern Tech', desc: 'Sidebar + skill bars', forRole: 'student' },
  { key: 'classic', label: 'Classic', desc: 'Traditional serif', forRole: 'student' },
  { key: 'minimal', label: 'ATS-Friendly', desc: 'No graphics, clean', forRole: 'student' },
  { key: 'academic', label: 'Academic CV', desc: 'Research & publications', forRole: 'faculty' },
  { key: 'corporate', label: 'Corporate', desc: 'Executive profile', forRole: 'student' },
  { key: 'internship', label: 'Internship', desc: 'Compact one-page', forRole: 'student' },
  { key: 'creative', label: 'Creative', desc: 'Accent + visual', forRole: 'student' },
  { key: 'government', label: 'Government', desc: 'Formal declaration', forRole: 'student' },
];

interface AIScore {
  score: number;
  breakdown: Record<string, number>;
  suggestions: string[];
  missingKeywords: string[];
  bulletImprovements: string[];
}

export default function ResumeBuilderPage() {
  const [data, setData] = useState<ResumeData>(emptyData);
  const [template, setTemplate] = useState<TemplateKey>('modern');
  const [dragItem, setDragItem] = useState<SectionKey | null>(null);
  const [branch, setBranch] = useState('CSE');
  const [aiScore, setAiScore] = useState<AIScore | null>(null);
  const [scoring, setScoring] = useState(false);
  const [enhancing, setEnhancing] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  // Role-based template filtering
  const filteredTemplates = useMemo(() => {
    if (user?.role === 'Faculty') {
      return templates.filter(t => t.forRole === 'faculty' || t.key === 'corporate' || t.key === 'minimal');
    }
    return templates;
  }, [user?.role]);

  const update = (key: string, value: string) => setData(prev => ({ ...prev, [key]: value }));

  const toggleSection = (key: SectionKey) => {
    setData(prev => ({
      ...prev,
      sections: {
        ...prev.sections,
        [key]: { ...prev.sections[key], visible: !prev.sections[key].visible },
      },
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setData(prev => ({ ...prev, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  };

  const updateSkillLevel = (skill: string, level: number) => {
    setData(prev => ({ ...prev, skillLevels: { ...prev.skillLevels, [skill]: level } }));
  };

  const handleDragStart = (key: SectionKey) => setDragItem(key);
  const handleDragOver = (e: React.DragEvent, key: SectionKey) => {
    e.preventDefault();
    if (!dragItem || dragItem === key) return;
    setData(prev => {
      const sections = { ...prev.sections };
      const dragOrder = sections[dragItem].order;
      const overOrder = sections[key].order;
      sections[dragItem] = { ...sections[dragItem], order: overOrder };
      sections[key] = { ...sections[key], order: dragOrder };
      return { ...prev, sections };
    });
  };

  const handleDownload = async () => {
    const el = document.getElementById('resume-preview');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('portrait', 'px', 'a4');
      const pdfW = pdf.internal.pageSize.getWidth();
      const pdfH = (canvas.height * pdfW) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfW, pdfH);
      pdf.save(`${data.name || 'Resume'}.pdf`);
    } catch (err) {
      console.error('PDF generation failed:', err);
    }
  };

  const scoreResume = async () => {
    setScoring(true);
    try {
      // TODO: Replace with Firebase Cloud Function call
      toast({ title: 'Coming Soon', description: 'AI Resume Scoring will be available once Firebase functions are configured.' });
    } catch (err: any) {
      toast({ title: 'Scoring failed', description: err.message, variant: 'destructive' });
    } finally {
      setScoring(false);
    }
  };

  const enhanceResume = async () => {
    setEnhancing(true);
    try {
      // TODO: Replace with Firebase Cloud Function call
      toast({ title: 'Coming Soon', description: 'AI Resume Enhancement will be available once Firebase functions are configured.' });
    } catch (err: any) {
      toast({ title: 'Enhancement failed', description: err.message, variant: 'destructive' });
    } finally {
      setEnhancing(false);
    }
  };

  const addSuggestedSkill = (skill: string) => {
    const current = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
    if (!current.includes(skill)) {
      update('skills', [...current, skill].join(', '));
    }
  };

  const orderedSections = (Object.keys(sectionLabels) as SectionKey[]).sort(
    (a, b) => data.sections[a].order - data.sections[b].order
  );

  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  // Missing section warnings
  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!data.name.trim()) w.push('Name is empty');
    if (!data.email.trim()) w.push('Email is missing');
    if (!data.summary.trim() && data.sections.summary.visible) w.push('Summary section is empty');
    if (!data.education.trim() && data.sections.education.visible) w.push('Education is missing');
    if (skills.length < 3) w.push('Add at least 3-5 skills for better chances');
    if (!data.projects.trim() && data.sections.projects.visible) w.push('Projects section is empty');
    return w;
  }, [data, skills.length]);

  const suggestedSkills = BRANCH_SKILL_SUGGESTIONS[branch] || BRANCH_SKILL_SUGGESTIONS.CSE;
  const missingSuggestions = suggestedSkills.filter(s => !skills.includes(s));

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="section-title mb-3">Resume <span className="gradient-text">Builder 2.0</span></h1>
          <p className="section-subtitle">AI-powered career intelligence system with live preview</p>
        </div>

        {/* Template Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {filteredTemplates.map(t => (
            <button
              key={t.key}
              onClick={() => setTemplate(t.key)}
              className={`flex flex-col items-center px-6 py-3 rounded-xl text-sm font-medium transition-all border ${
                template === t.key
                  ? 'bg-primary text-primary-foreground border-primary shadow-glow'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/30'
              }`}
            >
              <FileText className="w-4 h-4 mb-1" />
              <span>{t.label}</span>
              <span className="text-[10px] opacity-70">{t.desc}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor Panel */}
          <div className="space-y-5">
            {/* Warnings */}
            {warnings.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
                <div className="flex items-center gap-2 text-amber-600 mb-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span className="text-sm font-semibold">Missing Sections</span>
                </div>
                <ul className="space-y-1">
                  {warnings.map(w => (
                    <li key={w} className="text-xs text-amber-600/80">• {w}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Photo Upload */}
            <div className="feature-card p-5">
              <label className="block text-sm font-medium mb-2">Profile Photo</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-muted border border-border flex items-center justify-center flex-shrink-0">
                  {data.photo ? (
                    <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <Image className="w-5 h-5 text-muted-foreground" />
                  )}
                </div>
                <label className="btn-outline text-xs px-4 py-2 cursor-pointer">
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                </label>
                {data.photo && (
                  <button onClick={() => setData(prev => ({ ...prev, photo: undefined }))} className="text-xs text-destructive">Remove</button>
                )}
              </div>
            </div>

            {/* Theme Customization */}
            <div className="feature-card p-5">
              <h3 className="font-semibold text-sm flex items-center gap-2 mb-3">
                <Palette className="w-4 h-4" /> Theme Customization
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-2 text-muted-foreground">Accent Color</label>
                  <div className="flex flex-wrap gap-2">
                    {ACCENT_COLORS.map(c => (
                      <button
                        key={c}
                        onClick={() => setData(prev => ({ ...prev, accentColor: c }))}
                        className={`w-7 h-7 rounded-lg transition-all ${data.accentColor === c ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-2 text-muted-foreground flex items-center gap-1">
                    <Type className="w-3 h-3" /> Font
                  </label>
                  <select
                    value={data.fontFamily || 'sans-serif'}
                    onChange={e => setData(prev => ({ ...prev, fontFamily: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm outline-none"
                  >
                    {FONT_OPTIONS.map(f => (
                      <option key={f.value} value={f.value}>{f.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Basic Info + Branch */}
            <div className="feature-card p-5 space-y-4">
              <h3 className="font-semibold text-sm">Basic Information</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { key: 'name', label: 'Full Name', placeholder: 'John Doe' },
                  { key: 'email', label: 'Email', placeholder: 'john@example.com' },
                  { key: 'phone', label: 'Phone', placeholder: '+91 98765 43210' },
                ].map(f => (
                  <div key={f.key} className={f.key === 'name' ? 'col-span-2' : ''}>
                    <label className="block text-xs font-medium mb-1 text-muted-foreground">{f.label}</label>
                    <input
                      type="text"
                      value={(data as any)[f.key]}
                      onChange={e => update(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-all"
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-medium mb-1 text-muted-foreground">Branch (for skill suggestions)</label>
                <select
                  value={branch}
                  onChange={e => setBranch(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border outline-none text-sm"
                >
                  {['CSE', 'ECE', 'MECH', 'CIVIL'].map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            {/* Smart Skill Suggestions */}
            {missingSuggestions.length > 0 && (
              <div className="feature-card p-4">
                <h3 className="text-xs font-semibold text-muted-foreground mb-2">💡 Suggested skills for {branch}:</h3>
                <div className="flex flex-wrap gap-1.5">
                  {missingSuggestions.map(skill => (
                    <button
                      key={skill}
                      onClick={() => addSuggestedSkill(skill)}
                      className="px-2.5 py-1 rounded-lg text-xs bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      + {skill}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Sections - Draggable + Toggleable */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm">Sections <span className="text-muted-foreground text-xs">(drag to reorder, toggle visibility)</span></h3>
              {orderedSections.map(key => {
                const isTextarea = key !== 'skills';
                const placeholders: Record<SectionKey, string> = {
                  summary: 'Brief summary about yourself...',
                  education: 'B.Tech CSE, QISCET (2022-2026)\n10th - 95%, 12th - 92%',
                  experience: 'Company Name - Role\nJan 2024 - Present',
                  skills: 'React, TypeScript, Python, Machine Learning',
                  projects: 'Project Name - Description\nTech stack used',
                };

                return (
                  <div
                    key={key}
                    draggable
                    onDragStart={() => handleDragStart(key)}
                    onDragOver={(e) => handleDragOver(e, key)}
                    onDragEnd={() => setDragItem(null)}
                    className={`feature-card p-4 transition-all ${dragItem === key ? 'opacity-50 scale-[0.98]' : ''} ${!data.sections[key].visible ? 'opacity-60' : ''}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-muted-foreground cursor-grab" />
                        <label className="text-sm font-medium">{sectionLabels[key]}</label>
                      </div>
                      <button onClick={() => toggleSection(key)} className="text-xs flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                        {data.sections[key].visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        {data.sections[key].visible ? 'Visible' : 'Hidden'}
                      </button>
                    </div>
                    {data.sections[key].visible && (
                      <>
                        {isTextarea ? (
                          <textarea
                            rows={3}
                            value={(data as any)[key]}
                            onChange={e => update(key, e.target.value)}
                            placeholder={placeholders[key]}
                            className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm resize-none transition-all"
                          />
                        ) : (
                          <input
                            type="text"
                            value={(data as any)[key]}
                            onChange={e => update(key, e.target.value)}
                            placeholder={placeholders[key]}
                            className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-all"
                          />
                        )}

                        {key === 'skills' && skills.length > 0 && template === 'modern' && (
                          <div className="mt-3 space-y-2">
                            <p className="text-xs text-muted-foreground">Adjust skill levels:</p>
                            {skills.map(skill => (
                              <div key={skill} className="flex items-center gap-3">
                                <span className="text-xs w-28 truncate">{skill}</span>
                                <input
                                  type="range" min={10} max={100}
                                  value={data.skillLevels?.[skill] ?? 75}
                                  onChange={e => updateSkillLevel(skill, Number(e.target.value))}
                                  className="flex-1 h-1.5 accent-[hsl(var(--primary))]"
                                />
                                <span className="text-xs text-muted-foreground w-8">{data.skillLevels?.[skill] ?? 75}%</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            {/* AI Actions */}
            <div className="grid grid-cols-2 gap-3">
              <button onClick={scoreResume} disabled={scoring} className="btn-outline justify-center text-sm py-3">
                {scoring ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {scoring ? 'Scoring...' : 'AI Score'}
              </button>
              <button onClick={enhanceResume} disabled={enhancing} className="btn-outline justify-center text-sm py-3">
                {enhancing ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                {enhancing ? 'Enhancing...' : 'AI Enhance'}
              </button>
            </div>

            {/* AI Score Display */}
            {aiScore && (
              <div className="feature-card p-5">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-20 h-20">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                      <circle cx="40" cy="40" r="34" fill="none"
                        className={aiScore.score >= 70 ? 'stroke-green-500' : aiScore.score >= 40 ? 'stroke-amber-500' : 'stroke-red-500'}
                        strokeWidth="6" strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 34}`}
                        strokeDashoffset={`${2 * Math.PI * 34 * (1 - aiScore.score / 100)}`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="font-grotesk font-bold text-lg">{aiScore.score}</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-grotesk font-semibold">Resume Score</h4>
                    <p className="text-xs text-muted-foreground">
                      {aiScore.score >= 70 ? 'Excellent resume!' : aiScore.score >= 40 ? 'Good, but can improve' : 'Needs significant work'}
                    </p>
                  </div>
                </div>

                {/* Breakdown */}
                {aiScore.breakdown && (
                  <div className="space-y-2 mb-4">
                    {Object.entries(aiScore.breakdown).map(([key, val]) => (
                      <div key={key} className="flex items-center gap-3">
                        <span className="text-xs w-20 capitalize text-muted-foreground">{key}</span>
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${(val as number / 20) * 100}%` }} />
                        </div>
                        <span className="text-xs font-medium w-8">{val as number}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions */}
                {aiScore.suggestions && aiScore.suggestions.length > 0 && (
                  <div className="border-t border-border pt-3">
                    <p className="text-xs font-semibold mb-2">Suggestions:</p>
                    <ul className="space-y-1">
                      {aiScore.suggestions.slice(0, 5).map((s, i) => (
                        <li key={i} className="text-xs text-muted-foreground">→ {s}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* QR Code Toggle */}
            <div className="feature-card p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold">Resume QR Code</h3>
                  <p className="text-xs text-muted-foreground">Scan to view digital resume</p>
                </div>
                <button onClick={() => setShowQR(!showQR)} className="btn-outline text-xs px-3 py-1.5">
                  {showQR ? 'Hide QR' : 'Show QR'}
                </button>
              </div>
              {showQR && (
                <div className="mt-4 flex justify-center p-4 bg-white rounded-xl">
                  <QRCode value={`${window.location.origin}/resume-builder?name=${encodeURIComponent(data.name)}`} size={120} />
                </div>
              )}
            </div>

            <button onClick={handleDownload} className="btn-primary w-full justify-center">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Live Preview
            </h3>
            <div className="overflow-auto max-h-[85vh] rounded-xl border border-border shadow-card">
              <div className="transform scale-[0.55] origin-top-left" style={{ width: '181.82%' }}>
                <ResumePreview data={data} template={template} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
