import type { ResumeData } from '../ResumePreview';

export default function InternshipTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 rounded-xl shadow-lg max-w-[210mm] mx-auto overflow-hidden" style={{ minHeight: '297mm' }}>
      {/* Compact header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 text-white px-8 py-6">
        <div className="flex items-center gap-4">
          {data.photo && (
            <div className="w-16 h-16 rounded-full border-2 border-white/50 overflow-hidden flex-shrink-0">
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold">{data.name || 'Your Name'}</h1>
            <p className="text-xs text-white/80 mt-0.5">{[data.email, data.phone].filter(Boolean).join(' • ')}</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-5">
        {data.sections.summary.visible && data.summary && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700 mb-1.5 border-b border-emerald-100 pb-1">Objective</h2>
            <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {data.sections.education.visible && data.education && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700 mb-1.5 border-b border-emerald-100 pb-1">Education</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.education}</p>
          </section>
        )}

        {data.sections.skills.visible && skills.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700 mb-1.5 border-b border-emerald-100 pb-1">Technical Skills</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, i) => (
                <span key={i} className="text-xs bg-emerald-50 text-emerald-700 rounded px-2.5 py-1 border border-emerald-100 font-medium">{s}</span>
              ))}
            </div>
          </section>
        )}

        {data.sections.projects.visible && data.projects && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700 mb-1.5 border-b border-emerald-100 pb-1">Projects</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.projects}</p>
          </section>
        )}

        {data.sections.experience.visible && data.experience && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-700 mb-1.5 border-b border-emerald-100 pb-1">Experience / Internships</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.experience}</p>
          </section>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto px-8 pb-4">
        <div className="h-1 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-full" />
      </div>
    </div>
  );
}
