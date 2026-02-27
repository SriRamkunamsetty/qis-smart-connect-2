import { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { checkEligibility, type EligibilityResult } from './eligibilityRules';

export default function EligibilityChecker() {
  const [marks, setMarks] = useState('');
  const [category, setCategory] = useState('General');
  const [branch, setBranch] = useState('cse');
  const [result, setResult] = useState<EligibilityResult | null>(null);

  const handleCheck = () => {
    const m = parseFloat(marks);
    if (isNaN(m) || m < 0 || m > 100) return;
    setResult(checkEligibility(m, category, branch));
  };

  return (
    <div className="feature-card p-8 mt-12">
      <h3 className="font-grotesk font-bold text-2xl mb-2">
        Eligibility <span className="gradient-text">Checker</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Check your eligibility based on your inter marks and category
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Inter Marks (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={marks}
            onChange={e => setMarks(e.target.value)}
            placeholder="e.g., 85"
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
          >
            {['General', 'OBC', 'SC', 'ST'].map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Desired Branch</label>
          <select
            value={branch}
            onChange={e => setBranch(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm"
          >
            <option value="cse">CSE</option>
            <option value="ece">ECE</option>
            <option value="mech">MECH</option>
            <option value="civil">CIVIL</option>
          </select>
        </div>
      </div>

      <button onClick={handleCheck} className="btn-primary mb-6">
        Check Eligibility
      </button>

      {result && (
        <div
          className={`rounded-2xl p-6 border-2 transition-all duration-500 animate-fade-in ${
            result.eligible
              ? 'border-green-500/30 bg-green-500/5'
              : 'border-destructive/30 bg-destructive/5'
          }`}
        >
          <div className="flex items-center gap-3 mb-3">
            {result.eligible ? (
              <CheckCircle className="w-8 h-8 text-green-500" />
            ) : (
              <XCircle className="w-8 h-8 text-destructive" />
            )}
            <div>
              <p className={`font-grotesk font-bold text-xl ${result.eligible ? 'text-green-500' : 'text-destructive'}`}>
                {result.eligible ? 'You are Eligible!' : 'Not Eligible'}
              </p>
              <p className="text-sm text-muted-foreground">
                {result.department} — Required: {result.required}% | Your Score: {result.score}%
              </p>
            </div>
          </div>
          {!result.eligible && result.suggestions.length > 0 && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span className="text-sm font-medium">You may be eligible for:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.suggestions.map(s => (
                  <span key={s} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
