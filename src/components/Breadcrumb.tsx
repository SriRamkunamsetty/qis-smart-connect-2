import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const routeLabels: Record<string, string> = {
  academics: 'Academics',
  departments: 'Departments',
  research: 'Research',
  library: 'Library',
  admission: 'Admissions',
  fees: 'Fee Structure',
  scholarships: 'Scholarships',
  faqs: 'FAQs',
  campus: 'Campus',
  gallery: 'Gallery',
  placements: 'Placements',
  sports: 'Sports',
  events: 'Events',
  faculty: 'Faculty',
  'hostel-transport': 'Hostel & Transport',
  internships: 'Internships',
  'resume-builder': 'Resume Builder',
  insights: 'Data Insights',
  contact: 'Contact',
};

export default function Breadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null;

  const crumbs = segments.map((seg, i) => ({
    label: routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' '),
    path: '/' + segments.slice(0, i + 1).join('/'),
    isLast: i === segments.length - 1,
  }));

  return (
    <nav className="container mx-auto pt-24 pb-2" aria-label="Breadcrumb">
      <ol className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <Home className="w-3 h-3" />
            <span>Home</span>
          </Link>
        </li>
        {crumbs.map(crumb => (
          <li key={crumb.path} className="flex items-center gap-1.5">
            <ChevronRight className="w-3 h-3" />
            {crumb.isLast ? (
              <span className="text-foreground font-medium">{crumb.label}</span>
            ) : (
              <Link to={crumb.path} className="hover:text-primary transition-colors">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
