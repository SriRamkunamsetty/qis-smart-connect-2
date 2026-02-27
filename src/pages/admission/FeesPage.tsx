import FeeCalculator from '@/components/fee/FeeCalculator';
import { IndianRupee } from 'lucide-react';

const feeStructure = [
  { program: 'B.Tech (CSE / AI&ML / CSD)', tuition: '1,20,000', hostel: '80,000', total: '2,00,000' },
  { program: 'B.Tech (ECE / EEE)', tuition: '1,10,000', hostel: '80,000', total: '1,90,000' },
  { program: 'B.Tech (MECH / CIVIL)', tuition: '1,00,000', hostel: '80,000', total: '1,80,000' },
  { program: 'M.Tech (All Branches)', tuition: '90,000', hostel: '80,000', total: '1,70,000' },
  { program: 'MCA', tuition: '85,000', hostel: '80,000', total: '1,65,000' },
  { program: 'MBA', tuition: '95,000', hostel: '80,000', total: '1,75,000' },
];

export default function FeesPage() {
  return (
    <div className="animate-fade-in space-y-10 max-w-4xl mx-auto">
      <div className="feature-card p-6">
        <div className="flex items-center gap-3 mb-4">
          <IndianRupee className="w-5 h-5 text-primary" />
          <h3 className="font-grotesk font-semibold text-lg">Fee Structure 2025-26</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-muted-foreground font-medium">Program</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Tuition</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Hostel</th>
                <th className="text-right py-3 px-4 text-muted-foreground font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {feeStructure.map(row => (
                <tr key={row.program} className="border-b border-border/50 hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4 font-medium">{row.program}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">₹{row.tuition}</td>
                  <td className="py-3 px-4 text-right text-muted-foreground">₹{row.hostel}</td>
                  <td className="py-3 px-4 text-right font-semibold text-primary">₹{row.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-muted-foreground mt-4">* Hostel fees are optional. Transport charges extra. Fees subject to regulatory revision.</p>
      </div>

      <FeeCalculator />
    </div>
  );
}
