import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { q: 'What is the admission process for B.Tech?', a: 'Admission is based on EAPCET/JEE Mains rank through APSCHE counselling. Management quota seats are also available through direct admission based on merit.' },
  { q: 'What are the eligibility criteria?', a: 'Candidates must have passed 10+2 with Physics, Chemistry, and Mathematics with a minimum of 45% aggregate (40% for reserved categories).' },
  { q: 'Is hostel facility available?', a: 'Yes, separate hostel facilities for boys and girls are available within the campus with mess, Wi-Fi, and 24/7 security.' },
  { q: 'What is the placement record?', a: 'QISCET has a consistent placement rate of 94%+. Top recruiters include Google, Microsoft, Amazon, TCS, Infosys, and more.' },
  { q: 'Are scholarships available?', a: 'Yes, multiple scholarships are available including merit-based, category-based, sports scholarships, and girl child scholarship.' },
  { q: 'Is the college autonomous?', a: 'Yes, QIS College of Engineering and Technology is an Autonomous institution, approved by AICTE and affiliated to JNTU Kakinada.' },
  { q: 'What lateral entry options are available?', a: 'Diploma holders can join B.Tech 2nd year through ECET counselling. Direct admission is also available for eligible candidates.' },
  { q: 'Is there a transport facility?', a: 'Yes, college buses operate on 25+ routes covering Ongole and surrounding areas within a 50km radius.' },
];

export default function FaqsPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="animate-fade-in max-w-3xl mx-auto space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className="feature-card">
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between text-left"
          >
            <span className="font-medium text-sm pr-4">{faq.q}</span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
          </button>
          {open === i && (
            <div className="mt-3 pt-3 border-t border-border animate-fade-in">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
