import { useState } from 'react';
import { Check, Upload, ChevronRight } from 'lucide-react';
import EligibilityChecker from '@/components/eligibility/EligibilityChecker';

const steps = ['Personal Details', 'Academic Details', 'Documents', 'Review & Submit'];

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  const progress = (currentStep / (steps.length - 1)) * 100;
  const handleNext = () => { if (currentStep < steps.length - 1) setCurrentStep(s => s + 1); else setSubmitted(true); };

  if (submitted) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center max-w-md animate-scale-in">
          <div className="w-20 h-20 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="font-grotesk font-bold text-3xl mb-3">Application Submitted!</h2>
          <p className="text-muted-foreground mb-8">
            Your application has been received. Application ID: <span className="text-primary font-semibold">QISCET-2025-{Math.floor(Math.random() * 9000) + 1000}</span>
          </p>
          <button onClick={() => { setSubmitted(false); setCurrentStep(0); }} className="btn-primary">Submit Another</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      {/* Step indicator */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-3">
          {steps.map((step, i) => (
            <div key={step} className="flex flex-col items-center gap-1 flex-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${i < currentStep ? 'bg-primary text-primary-foreground' : i === currentStep ? 'bg-gradient-primary text-white shadow-glow scale-110' : 'bg-muted text-muted-foreground'}`}>
                {i < currentStep ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`text-xs hidden sm:block ${i === currentStep ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{step}</span>
            </div>
          ))}
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-primary rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="feature-card p-8 animate-fade-in" key={currentStep}>
        <h3 className="font-grotesk font-bold text-xl mb-6">Step {currentStep + 1}: {steps[currentStep]}</h3>
        {currentStep === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {[{ label: 'First Name', placeholder: 'John' }, { label: 'Last Name', placeholder: 'Doe' }, { label: 'Date of Birth', placeholder: '', type: 'date' }, { label: 'Phone', placeholder: '+91 XXXXX' }, { label: 'Email', placeholder: 'john@example.com', type: 'email' }, { label: 'City', placeholder: 'Ongole' }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium mb-2">{f.label}</label>
                <input type={f.type || 'text'} placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-all" />
              </div>
            ))}
          </div>
        )}
        {currentStep === 1 && (
          <div className="space-y-5">
            {[{ label: 'Previous School', placeholder: 'Delhi Public School' }, { label: '10th Marks (%)', placeholder: '95%' }, { label: '12th Marks (%)', placeholder: '92%' }, { label: 'Entrance Exam Score', placeholder: 'JEE Mains: 180' }].map(f => (
              <div key={f.label}>
                <label className="block text-sm font-medium mb-2">{f.label}</label>
                <input type="text" placeholder={f.placeholder} className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm transition-all" />
              </div>
            ))}
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Department</label>
              <select className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm">
                <option>Computer Science & Engineering</option>
                <option>Electronics & Communication</option>
                <option>Mechanical Engineering</option>
                <option>Civil Engineering</option>
              </select>
            </div>
          </div>
        )}
        {currentStep === 2 && (
          <div className="space-y-5">
            {['10th Mark Sheet', '12th Mark Sheet', 'Entrance Score Card', 'Passport Photo', 'Aadhar Card'].map(doc => (
              <div key={doc} className="border-2 border-dashed border-border rounded-xl p-5 flex items-center gap-4 hover:border-primary/40 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><Upload className="w-5 h-5 text-primary" /></div>
                <div><p className="text-sm font-medium">{doc}</p><p className="text-xs text-muted-foreground">PDF, JPG or PNG (max 2MB)</p></div>
              </div>
            ))}
          </div>
        )}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="glass-card rounded-xl p-5 space-y-3">
              {[{ label: 'Name', value: 'John Doe' }, { label: 'Department', value: 'CSE' }, { label: 'Entrance Score', value: 'JEE: 180' }].map(item => (
                <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                  <span className="text-sm text-muted-foreground">{item.label}</span>
                  <span className="text-sm font-medium">{item.value}</span>
                </div>
              ))}
            </div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-0.5 rounded" />
              <span className="text-sm text-muted-foreground">I confirm all information is accurate and agree to <span className="text-primary">terms</span>.</span>
            </label>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button onClick={() => setCurrentStep(s => Math.max(0, s - 1))} disabled={currentStep === 0} className="btn-outline disabled:opacity-30">Back</button>
          <button onClick={handleNext} className="btn-primary">{currentStep === steps.length - 1 ? 'Submit' : 'Next'} <ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>

      <EligibilityChecker />
    </div>
  );
}
