import { useState } from 'react';
import { Calculator, IndianRupee } from 'lucide-react';
import { feeStructure } from '@/data/extendedData';

const HOSTEL_FEE = 50000;
const TRANSPORT_FEE = 25000;

export default function FeeCalculator() {
  const [course, setCourse] = useState(Object.keys(feeStructure)[0]);
  const [hostel, setHostel] = useState(false);
  const [transport, setTransport] = useState(false);

  const fees = feeStructure[course];
  const tuitionTotal = fees ? fees.tuition + fees.lab + fees.library : 0;
  const hostelAmount = hostel ? HOSTEL_FEE : 0;
  const transportAmount = transport ? TRANSPORT_FEE : 0;
  const total = tuitionTotal + hostelAmount + transportAmount;

  return (
    <div className="feature-card p-8 mt-12">
      <div className="flex items-center gap-3 mb-2">
        <Calculator className="w-6 h-6 text-primary" />
        <h3 className="font-grotesk font-bold text-2xl">
          Fee <span className="gradient-text">Calculator</span>
        </h3>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Estimate your total academic expenses</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium mb-2">Course</label>
          <select
            value={course}
            onChange={e => setCourse(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
          >
            {Object.keys(feeStructure).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={hostel}
                onChange={e => setHostel(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 rounded-full bg-muted peer-checked:bg-primary transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform peer-checked:translate-x-4 shadow-sm" />
            </div>
            <span className="text-sm font-medium">Hostel</span>
          </label>
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={transport}
                onChange={e => setTransport(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-6 rounded-full bg-muted peer-checked:bg-primary transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform peer-checked:translate-x-4 shadow-sm" />
            </div>
            <span className="text-sm font-medium">Transport</span>
          </label>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="rounded-2xl bg-muted/50 border border-border p-5 space-y-3">
        {fees && (
          <>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tuition Fee</span>
              <span className="font-medium">₹{fees.tuition.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lab Fee</span>
              <span className="font-medium">₹{fees.lab.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Library Fee</span>
              <span className="font-medium">₹{fees.library.toLocaleString()}</span>
            </div>
          </>
        )}
        {hostel && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Hostel Fee</span>
            <span className="font-medium">₹{HOSTEL_FEE.toLocaleString()}</span>
          </div>
        )}
        {transport && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Transport Fee</span>
            <span className="font-medium">₹{TRANSPORT_FEE.toLocaleString()}</span>
          </div>
        )}
        <div className="pt-3 border-t border-border flex justify-between">
          <span className="font-grotesk font-bold">Total Estimate</span>
          <span className="font-grotesk font-bold text-lg flex items-center gap-1">
            <IndianRupee className="w-4 h-4" />
            {total.toLocaleString()}/yr
          </span>
        </div>
      </div>
    </div>
  );
}
