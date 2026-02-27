import QRCode from 'react-qr-code';
import { GraduationCap } from 'lucide-react';

interface Props {
  name: string;
  studentId: string;
  department: string;
  validity: string;
  photo?: string;
  course?: string;
  branch?: string;
  academicYear?: string;
  fatherName?: string;
}

export default function IDPreviewCard({
  name,
  studentId,
  department,
  validity,
  photo,
  course = 'B.Tech',
  branch = 'CSD',
  academicYear = '2024-2028',
  fatherName = '',
}: Props) {
  const qrData = JSON.stringify({
    studentID: studentId,
    name,
    branch,
    year: academicYear,
    department,
  });

  return (
    <div id="id-card-preview" className="w-full max-w-md mx-auto">
      {/* Front Side */}
      <div className="rounded-2xl overflow-hidden border-2 border-primary/30 shadow-lg" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0f4ff 100%)' }}>
        {/* Top Header Bar */}
        <div className="bg-[#1a237e] px-5 py-3 flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div className="flex-1 text-center">
            <h2 className="text-white font-bold text-sm leading-tight">QIS COLLEGE OF ENGINEERING & TECHNOLOGY</h2>
            <p className="text-white/70 text-[9px] mt-0.5">(Autonomous) | Accredited by NAAC with 'A+' Grade</p>
            <p className="text-white/60 text-[8px]">Vengamukkapalem, Ongole – 523 272</p>
          </div>
        </div>

        {/* ID Title */}
        <div className="bg-[#c62828] text-center py-1">
          <p className="text-white text-[10px] font-bold tracking-wider uppercase">Student Identity Card</p>
        </div>

        {/* Body */}
        <div className="p-5">
          <div className="flex gap-4">
            {/* Left: Barcode area */}
            <div className="flex flex-col items-center gap-2 flex-shrink-0">
              {/* Student Photo */}
              <div className="w-24 h-28 rounded-lg overflow-hidden border-2 border-[#1a237e]/20 bg-gray-100 flex items-center justify-center">
                {photo ? (
                  <img src={photo} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl font-bold text-[#1a237e]/30">{name.charAt(0)}</span>
                )}
              </div>
              {/* Mini barcode representation */}
              <div className="flex gap-px">
                {studentId.split('').map((char, i) => (
                  <div key={i} className="bg-gray-900" style={{ width: `${(char.charCodeAt(0) % 3) + 1}px`, height: '20px' }} />
                ))}
              </div>
              <p className="text-[8px] text-gray-500 font-mono">{studentId}</p>
            </div>

            {/* Right: Details */}
            <div className="flex-1 space-y-2">
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">Name</p>
                <p className="text-sm font-bold text-gray-900">{name || 'Student Name'}</p>
              </div>
              {fatherName && (
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">Father's Name</p>
                  <p className="text-xs text-gray-700">{fatherName}</p>
                </div>
              )}
              <div className="flex gap-4">
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">Course</p>
                  <p className="text-xs font-semibold text-gray-800">{course}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider">Branch</p>
                  <p className="text-xs font-semibold text-gray-800">{branch}</p>
                </div>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">Academic Year</p>
                <p className="text-xs font-semibold text-gray-800">{academicYear}</p>
              </div>
              <div>
                <p className="text-[9px] text-gray-400 uppercase tracking-wider">Department</p>
                <p className="text-[10px] text-gray-600">{department}</p>
              </div>
            </div>
          </div>

          {/* Bottom: QR + Validity + Signature */}
          <div className="mt-4 pt-3 border-t border-gray-200 flex items-end justify-between">
            <div className="p-1.5 rounded-lg bg-white border border-gray-200">
              <QRCode value={qrData} size={56} level="M" />
            </div>
            <div className="text-center">
              <p className="text-[8px] text-gray-400">Valid until</p>
              <p className="text-xs font-semibold text-[#1a237e]">{validity}</p>
            </div>
            <div className="text-center">
              <div className="w-20 border-b border-gray-400 mb-1" />
              <p className="text-[8px] text-gray-500">Principal</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
