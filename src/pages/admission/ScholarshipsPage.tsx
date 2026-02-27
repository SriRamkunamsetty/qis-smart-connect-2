import { GraduationCap, Award, Star, Users } from 'lucide-react';

const scholarships = [
  { name: 'Merit Scholarship', eligibility: 'Top 10% in entrance exam', amount: '50% tuition waiver', icon: Star, color: 'text-amber-500' },
  { name: 'SC/ST/OBC Scholarship', eligibility: 'Government category students', amount: 'Full fee reimbursement', icon: Users, color: 'text-blue-500' },
  { name: 'Sports Scholarship', eligibility: 'State/National level sports achievers', amount: '25-50% tuition waiver', icon: Award, color: 'text-green-500' },
  { name: 'Girl Child Scholarship', eligibility: 'All female students', amount: '₹10,000 per year', icon: GraduationCap, color: 'text-pink-500' },
  { name: 'EBC Scholarship', eligibility: 'Family income < ₹2.5 LPA', amount: 'Up to 75% tuition waiver', icon: Users, color: 'text-purple-500' },
  { name: 'Alumni Scholarship', eligibility: 'Children of QISCET alumni', amount: '₹15,000 per year', icon: Award, color: 'text-cyan-500' },
];

export default function ScholarshipsPage() {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <p className="text-muted-foreground text-sm max-w-xl mx-auto">
          QISCET offers various scholarships to support deserving students. Over ₹2.5 Cr in scholarships are awarded annually.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {scholarships.map(s => (
          <div key={s.name} className="feature-card">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">{s.name}</h3>
                <p className="text-xs text-muted-foreground mb-2">{s.eligibility}</p>
                <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{s.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="feature-card p-6 text-center">
        <h3 className="font-grotesk font-semibold text-lg mb-2">How to Apply?</h3>
        <p className="text-sm text-muted-foreground mb-4">Submit scholarship application along with admission form. Attach income certificate, category certificate, and merit documents.</p>
        <p className="text-xs text-muted-foreground">Contact: scholarship@qiscet.edu.in | +91 80 2345 6799</p>
      </div>
    </div>
  );
}
