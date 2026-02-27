import type { ResumeData } from '../ResumePreview';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 p-10 rounded-xl shadow-lg max-w-[210mm] mx-auto" style={{ minHeight: '297mm' }}>
      {/* Minimal header */}
      <div className="mb-8">
        <div className="flex items-center gap-5">
          {data.photo && (
            <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0">
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-2xl font-light tracking-wide text-gray-900">{data.name || 'Your Name'}</h1>
            <p className="text-xs text-gray-400 mt-1 tracking-wider">
              {[data.email, data.phone].filter(Boolean).join('  •  ')}
            </p>
          </div>
        </div>
        <div className="h-px bg-gray-200 mt-5" />
      </div>

      {data.sections.summary.visible && data.summary && (
        <section className="mb-7">
          <p className="text-sm text-gray-600 leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.sections.experience.visible && data.experience && (
        <section className="mb-7">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">Experience</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.experience}</p>
        </section>
      )}

      {data.sections.education.visible && data.education && (
        <section className="mb-7">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">Education</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.education}</p>
        </section>
      )}

      {data.sections.skills.visible && skills.length > 0 && (
        <section className="mb-7">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <span key={i} className="text-xs text-gray-600 border border-gray-200 rounded px-2.5 py-1">{s}</span>
            ))}
          </div>
        </section>
      )}

      {data.sections.projects.visible && data.projects && (
        <section className="mb-7">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.2em] text-gray-400 mb-3">Projects</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.projects}</p>
        </section>
      )}
    </div>
  );
}
