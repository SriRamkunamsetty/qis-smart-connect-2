import { NavLink, Outlet } from 'react-router-dom';
import { FileText, Calculator, GraduationCap, HelpCircle } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const tabs = [
  { label: 'Apply Now', path: '/admission', icon: FileText, end: true },
  { label: 'Fee Structure', path: '/admission/fees', icon: Calculator },
  { label: 'Scholarships', path: '/admission/scholarships', icon: GraduationCap },
  { label: 'FAQs', path: '/admission/faqs', icon: HelpCircle },
];

export default function AdmissionLayout() {
  return (
    <div className="page-transition min-h-screen pb-20">
      <Breadcrumb />
      <div className="container mx-auto pt-4">
        <div className="text-center mb-10">
          <h1 className="section-title mb-3">Admissions <span className="gradient-text">2025</span></h1>
          <p className="section-subtitle">Begin your journey at QIS College of Engineering and Technology</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(({ label, path, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-primary text-white shadow-glow'
                    : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </div>

        <Outlet />
      </div>
    </div>
  );
}
