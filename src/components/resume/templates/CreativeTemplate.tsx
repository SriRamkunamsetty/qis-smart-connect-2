import type { ResumeData } from '../ResumePreview';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const accentColor = (data as any).accentColor || '#e74c3c';

  return (
    <div id="resume-preview" className="bg-white text-gray-900 rounded-xl shadow-lg max-w-[210mm] mx-auto overflow-hidden" style={{ minHeight: '297mm' }}>
      {/* Creative header with accent stripe */}
      <div className="relative">
        <div className="h-32" style={{ background: `linear-gradient(135deg, ${accentColor}, ${accentColor}dd)` }} />
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0, 0 60%)' }} />
        <div className="absolute top-6 left-8 right-8 flex items-end gap-6">
          {data.photo && (
            <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-white shadow-lg flex-shrink-0 relative z-10">
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div className="pb-10 relative z-10">
            <h1 className="text-3xl font-black text-white tracking-tight">{data.name || 'Your Name'}</h1>
            <p className="text-sm text-white/80 mt-1">{[data.email, data.phone].filter(Boolean).join(' · ')}</p>
          </div>
        </div>
      </div>

      <div className="px-8 pt-4 pb-8">
        {/* Icon-based sections */}
        {data.sections.summary.visible && data.summary && (
          <section className="mb-6">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: accentColor }}>
              <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px]" style={{ background: accentColor }}>✦</span>
              About Me
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
          </section>
        )}

        <div className="grid grid-cols-5 gap-6">
          <div className="col-span-3 space-y-5">
            {data.sections.experience.visible && data.experience && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: accentColor }}>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px]" style={{ background: accentColor }}>💼</span>
                  Experience
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.experience}</p>
              </section>
            )}

            {data.sections.projects.visible && data.projects && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2 flex items-center gap-2" style={{ color: accentColor }}>
                  <span className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-[10px]" style={{ background: accentColor }}>🚀</span>
                  Projects
                </h2>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.projects}</p>
              </section>
            )}
          </div>

          <div className="col-span-2 space-y-5">
            {data.sections.education.visible && data.education && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2" style={{ color: accentColor }}>🎓 Education</h2>
                <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{data.education}</p>
              </section>
            )}

            {data.sections.skills.visible && skills.length > 0 && (
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2" style={{ color: accentColor }}>⚡ Skills</h2>
                <div className="flex flex-wrap gap-1.5">
                  {skills.map((s, i) => (
                    <span key={i} className="text-[10px] font-bold rounded-full px-2.5 py-1 text-white" style={{ background: `${accentColor}cc` }}>{s}</span>
                  ))}
                </div>
              </section>
            )}

            {/* Portfolio link placeholder */}
            <section>
              <h2 className="text-xs font-black uppercase tracking-[0.2em] mb-2" style={{ color: accentColor }}>🔗 Portfolio</h2>
              <p className="text-xs text-gray-500 italic">Add your portfolio URL</p>
            </section>
          </div>
        </div>
      </div>

      {/* Footer accent */}
      <div className="mt-auto h-2" style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }} />
    </div>
  );
}
