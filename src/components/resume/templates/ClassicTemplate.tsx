import type { ResumeData } from '../ResumePreview';

export default function ClassicTemplate({ data }: { data: ResumeData }) {
  return (
    <div id="resume-preview" className="bg-white text-gray-900 p-10 rounded-xl shadow-lg max-w-[210mm] mx-auto" style={{ minHeight: '297mm', fontFamily: 'Georgia, serif' }}>
      {/* Header */}
      <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
        {data.photo && (
          <div className="w-20 h-20 rounded-full mx-auto mb-3 overflow-hidden border-2 border-gray-300">
            <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>{data.name || 'Your Name'}</h1>
        <p className="text-sm text-gray-600 mt-1" style={{ fontFamily: 'Georgia, serif' }}>
          {[data.email, data.phone].filter(Boolean).join(' | ')}
        </p>
      </div>

      {data.sections.summary.visible && data.summary && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Professional Summary</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">{data.summary}</p>
        </section>
      )}

      {data.sections.education.visible && data.education && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Education</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.education}</p>
        </section>
      )}

      {data.sections.experience.visible && data.experience && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Experience</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.experience}</p>
        </section>
      )}

      {data.sections.skills.visible && data.skills && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Skills</h2>
          <p className="text-sm text-gray-700">{data.skills}</p>
        </section>
      )}

      {data.sections.projects.visible && data.projects && (
        <section className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-400 pb-1 mb-2" style={{ fontFamily: 'Georgia, serif' }}>Projects</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line">{data.projects}</p>
        </section>
      )}
    </div>
  );
}
