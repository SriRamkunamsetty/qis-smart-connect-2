import type { ResumeData } from '../ResumePreview';

export default function AcademicTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 rounded-xl shadow-lg max-w-[210mm] mx-auto overflow-hidden" style={{ minHeight: '297mm' }}>
      {/* Header with accent */}
      <div className="bg-[#2d3436] text-white px-10 py-8">
        <div className="flex items-center gap-6">
          {data.photo && (
            <div className="w-24 h-24 rounded-full border-3 border-white/40 overflow-hidden flex-shrink-0">
              <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-wide">{data.name || 'Your Name'}</h1>
            <p className="text-sm text-gray-300 mt-1">Research Scholar / Academician</p>
            <p className="text-xs text-gray-400 mt-2">{[data.email, data.phone].filter(Boolean).join(' | ')}</p>
          </div>
        </div>
      </div>

      <div className="p-10 space-y-6">
        {data.sections.summary.visible && data.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#2d3436] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#2d3436]" />Research Interests
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">{data.summary}</p>
          </section>
        )}

        {data.sections.education.visible && data.education && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#2d3436] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#2d3436]" />Education
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.education}</p>
          </section>
        )}

        {data.sections.experience.visible && data.experience && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#2d3436] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#2d3436]" />Publications & Research
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.experience}</p>
          </section>
        )}

        {data.sections.projects.visible && data.projects && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#2d3436] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#2d3436]" />Conferences & Presentations
            </h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">{data.projects}</p>
          </section>
        )}

        {data.sections.skills.visible && skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-[#2d3436] mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#2d3436]" />Areas of Expertise
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="text-xs bg-gray-100 text-gray-700 rounded-full px-3 py-1 border border-gray-200">{s}</span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
