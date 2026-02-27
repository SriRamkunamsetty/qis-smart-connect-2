import type { ResumeData } from '../ResumePreview';

export default function GovernmentTemplate({ data }: { data: ResumeData }) {
  const skills = data.skills ? data.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div id="resume-preview" className="bg-white text-gray-900 rounded-xl shadow-lg max-w-[210mm] mx-auto overflow-hidden" style={{ minHeight: '297mm', fontFamily: 'Times New Roman, serif' }}>
      {/* Formal header */}
      <div className="border-b-4 border-double border-gray-800 px-10 py-8 text-center">
        {data.photo && (
          <div className="w-28 h-36 mx-auto mb-3 overflow-hidden border-2 border-gray-400">
            <img src={data.photo} alt={data.name} className="w-full h-full object-cover" />
          </div>
        )}
        <h1 className="text-2xl font-bold uppercase tracking-[0.15em] text-gray-900">{data.name || 'YOUR NAME'}</h1>
        <div className="mt-2 text-xs text-gray-600 space-y-0.5">
          {data.email && <p>Email: {data.email}</p>}
          {data.phone && <p>Phone: {data.phone}</p>}
        </div>
      </div>

      <div className="px-10 py-6 space-y-5">
        {/* Formal numbered sections */}
        {data.sections.summary.visible && data.summary && (
          <section>
            <h2 className="text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-2">1. Objective / Career Summary</h2>
            <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line pl-4">{data.summary}</p>
          </section>
        )}

        {data.sections.education.visible && data.education && (
          <section>
            <h2 className="text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-2">2. Educational Qualifications</h2>
            <div className="pl-4">
              <table className="w-full text-xs border border-gray-400">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border border-gray-400 px-2 py-1 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-400 px-2 py-2 whitespace-pre-line text-sm">{data.education}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        )}

        {data.sections.experience.visible && data.experience && (
          <section>
            <h2 className="text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-2">3. Work Experience / Service Record</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-4">{data.experience}</p>
          </section>
        )}

        {data.sections.skills.visible && skills.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-2">4. Skills & Competencies</h2>
            <ul className="list-disc pl-8 text-sm text-gray-700 space-y-1">
              {skills.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ul>
          </section>
        )}

        {data.sections.projects.visible && data.projects && (
          <section>
            <h2 className="text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-2">5. Projects / Achievements</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed pl-4">{data.projects}</p>
          </section>
        )}

        {/* Declaration */}
        <section className="pt-6">
          <h2 className="text-sm font-bold uppercase border-b-2 border-gray-800 pb-1 mb-3">Declaration</h2>
          <p className="text-xs text-gray-600 italic pl-4">
            I hereby declare that the above-mentioned information is correct up to my knowledge and I bear the responsibility for the correctness of the above-mentioned particulars.
          </p>
          <div className="flex justify-between items-end mt-8 px-4">
            <div className="text-xs text-gray-500">
              <p>Place: ___________</p>
              <p className="mt-1">Date: ___________</p>
            </div>
            <div className="text-center text-xs text-gray-500">
              <div className="w-32 border-b border-gray-400 mb-1" />
              <p>({data.name || 'Your Name'})</p>
              <p>Signature</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
