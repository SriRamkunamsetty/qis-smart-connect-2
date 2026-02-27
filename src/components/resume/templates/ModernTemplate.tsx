import type { ResumeData } from '../ResumePreview';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 rounded-xl shadow-lg max-w-[210mm] mx-auto overflow-hidden" style={{ minHeight: '297mm' }}>
      {/* Sidebar + Main layout */}
      <div className="flex min-h-[297mm]">
        {/* Left Sidebar */}
        <div className="w-[35%] bg-[#1e3a5f] text-white p-6 flex flex-col">
          {/* Photo */}
          <div className="flex justify-center mb-5">
            <div className="w-28 h-28 rounded-full border-4 border-white/30 overflow-hidden bg-white/10 flex items-center justify-center">
              {data.photo ? (
                <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
              ) : (
                <span className="text-4xl font-bold text-white/50">{(data.name || 'Y')[0]}</span>
              )}
            </div>
          </div>

          {/* Contact */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 border-b border-white/20 pb-1">Contact</h3>
            {data.email && <p className="text-xs text-white/80 mb-1">📧 {data.email}</p>}
            {data.phone && <p className="text-xs text-white/80 mb-1">📱 {data.phone}</p>}
          </div>

          {/* Skills with progress bars */}
          {data.sections.skills.visible && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-blue-200 mb-3 border-b border-white/20 pb-1">Skills</h3>
              <div className="space-y-2.5">
                {skills.map((skill, i) => {
                  const level = data.skillLevels?.[skill] ?? 75;
                  return (
                    <div key={i}>
                      <div className="flex justify-between text-xs mb-0.5">
                        <span className="text-white/90">{skill}</span>
                        <span className="text-white/50">{level}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-300 rounded-full transition-all" style={{ width: `${level}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-1 p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{data.name || 'Your Name'}</h1>
            {data.summary && data.sections.summary.visible && (
              <p className="text-sm text-gray-600 mt-3 leading-relaxed">{data.summary}</p>
            )}
          </div>

          {data.sections.education.visible && data.education && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3a5f] mb-2 border-b-2 border-[#1e3a5f] pb-1">Education</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{data.education}</p>
            </section>
          )}

          {data.sections.experience.visible && data.experience && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3a5f] mb-2 border-b-2 border-[#1e3a5f] pb-1">Experience</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{data.experience}</p>
            </section>
          )}

          {data.sections.projects.visible && data.projects && (
            <section className="mb-5">
              <h2 className="text-sm font-bold uppercase tracking-wider text-[#1e3a5f] mb-2 border-b-2 border-[#1e3a5f] pb-1">Projects</h2>
              <p className="text-sm text-gray-700 whitespace-pre-line">{data.projects}</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
