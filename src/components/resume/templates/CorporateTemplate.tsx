import type { ResumeData } from '../ResumePreview';

export default function CorporateTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 rounded-xl shadow-lg max-w-[210mm] mx-auto overflow-hidden" style={{ minHeight: '297mm' }}>
      {/* Top bar */}
      <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500" />

      <div className="p-10">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-gray-100">
          <div className="flex items-center gap-5">
            {data.photo && (
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{data.name || 'Your Name'}</h1>
              <p className="text-sm text-blue-600 font-medium mt-1">Professional Profile</p>
            </div>
          </div>
          <div className="text-right text-xs text-gray-500 space-y-0.5">
            {data.email && <p>{data.email}</p>}
            {data.phone && <p>{data.phone}</p>}
          </div>
        </div>

        {/* Two column */}
        <div className="flex gap-8">
          <div className="flex-1 space-y-6">
            {data.sections.summary.visible && data.summary && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 mb-2">Executive Summary</h2>
                <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
              </section>
            )}

            {data.sections.experience.visible && data.experience && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 mb-2">Professional Experience</h2>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.experience}</p>
              </section>
            )}

            {data.sections.projects.visible && data.projects && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 mb-2">Key Projects & Achievements</h2>
                <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.projects}</p>
              </section>
            )}
          </div>

          {/* Right sidebar */}
          <div className="w-[200px] flex-shrink-0 space-y-6">
            {data.sections.education.visible && data.education && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 mb-2">Education</h2>
                <p className="text-xs text-gray-600 whitespace-pre-line leading-relaxed">{data.education}</p>
              </section>
            )}

            {data.sections.skills.visible && skills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-blue-600 mb-2">Core Competencies</h2>
                <div className="space-y-1.5">
                  {skills.map((s, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-xs text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
