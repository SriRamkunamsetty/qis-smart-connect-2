import { useState } from 'react';
import { Upload, Send, X } from 'lucide-react';

interface Props {
  internshipId: number | null;
  onClose: () => void;
}

export default function InternshipForm({ internshipId, onClose }: Props) {
  const [submitted, setSubmitted] = useState(false);

  if (!internshipId) return null;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="feature-card p-8 max-w-md w-full mx-4 animate-fade-in text-center">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
            <Send className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="font-grotesk font-bold text-xl mb-2">Application Submitted!</h3>
          <p className="text-sm text-muted-foreground mb-6">We'll review your application and get back to you soon.</p>
          <button onClick={() => { setSubmitted(false); onClose(); }} className="btn-primary">Close</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="feature-card p-8 max-w-md w-full mx-4 animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-grotesk font-bold text-xl">Apply for Internship</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Cover Letter</label>
            <textarea
              rows={4}
              placeholder="Why are you interested in this internship..."
              className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Resume</label>
            <div className="border-2 border-dashed border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary/40 transition-colors cursor-pointer">
              <Upload className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Upload Resume</p>
                <p className="text-xs text-muted-foreground">PDF only (max 5MB)</p>
              </div>
            </div>
          </div>

          <button onClick={() => setSubmitted(true)} className="btn-primary w-full justify-center">
            <Send className="w-4 h-4" /> Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
