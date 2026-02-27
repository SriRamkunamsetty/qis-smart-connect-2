import { useState } from 'react';
import InternshipList from '@/components/internship/InternshipList';
import InternshipForm from '@/components/internship/InternshipForm';

export default function Internships() {
  const [applyingTo, setApplyingTo] = useState<number | null>(null);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Internship <span className="gradient-text">Portal</span></h1>
          <p className="section-subtitle">Explore internship opportunities from top companies</p>
        </div>

        <InternshipList onApply={setApplyingTo} />
        <InternshipForm internshipId={applyingTo} onClose={() => setApplyingTo(null)} />
      </div>
    </div>
  );
}
