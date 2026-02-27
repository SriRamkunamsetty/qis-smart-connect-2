import { useState, useRef } from 'react';
import { Download, Eye, Upload } from 'lucide-react';
import IDPreviewCard from './IDPreviewCard';
import { useAuth } from '@/context/AuthContext';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function DigitalIDCard() {
  const { user } = useAuth();
  const [showPreview, setShowPreview] = useState(false);
  const [photo, setPhoto] = useState<string | undefined>();
  const cardRef = useRef<HTMLDivElement>(null);

  const studentData = {
    name: user?.name || 'Student Name',
    studentId: 'QISCET-2025-4821',
    department: 'Computer Science & Engineering',
    validity: 'July 2029',
    course: 'B.Tech',
    branch: 'CSD',
    academicYear: '2024-2028',
    photo,
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    const el = document.getElementById('id-card-preview');
    if (!el) return;
    try {
      const canvas = await html2canvas(el, { scale: 3, backgroundColor: '#ffffff', useCORS: true });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: [canvas.width / 2, canvas.height / 2] });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width / 2, canvas.height / 2);
      pdf.save(`${studentData.name}-ID-Card.pdf`);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    }
  };

  return (
    <div className="feature-card p-6">
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <h3 className="font-grotesk font-semibold">Digital ID Card</h3>
        <div className="flex gap-2 flex-wrap">
          <label className="btn-outline text-xs px-3 py-2 cursor-pointer">
            <Upload className="w-3.5 h-3.5" /> Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
          </label>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="btn-outline text-xs px-3 py-2"
          >
            <Eye className="w-3.5 h-3.5" /> {showPreview ? 'Hide' : 'Preview'}
          </button>
          {showPreview && (
            <button onClick={handleDownload} className="btn-primary text-xs px-3 py-2">
              <Download className="w-3.5 h-3.5" /> Download PDF
            </button>
          )}
        </div>
      </div>

      {showPreview && (
        <div ref={cardRef} className="animate-fade-in">
          <IDPreviewCard {...studentData} />
        </div>
      )}

      {!showPreview && (
        <p className="text-sm text-muted-foreground">
          Upload your photo and click Preview to see your digital ID card matching QIS College format. Download as printable PDF.
        </p>
      )}
    </div>
  );
}
