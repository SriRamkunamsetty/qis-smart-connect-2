import { NavLink, Outlet } from 'react-router-dom';
import { BookOpen, Users, FlaskConical, Library } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const tabs = [
  { label: 'Departments', path: '/academics', icon: BookOpen, end: true },
  { label: 'Faculty', path: '/academics/faculty', icon: Users },
  { label: 'Research', path: '/academics/research', icon: FlaskConical },
  { label: 'Library', path: '/academics/library', icon: Library },
];

export default function AcademicsLayout() {
  return (
    <div className="page-transition min-h-screen pb-20">
      <Breadcrumb />
      <div className="container mx-auto pt-4">
        <div className="text-center mb-10">
          <h1 className="section-title mb-3">Academic <span className="gradient-text">Excellence</span></h1>
          <p className="section-subtitle">Explore our world-class programs designed for tomorrow's leaders</p>
        </div>

        {/* Sub-nav */}
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
