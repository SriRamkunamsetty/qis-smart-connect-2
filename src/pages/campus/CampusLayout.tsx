import { NavLink, Outlet } from 'react-router-dom';
import { Image, BarChart3, Trophy, PartyPopper } from 'lucide-react';
import Breadcrumb from '@/components/Breadcrumb';

const tabs = [
  { label: 'Gallery', path: '/campus/gallery', icon: Image },
  { label: 'Placements', path: '/campus/placements', icon: BarChart3 },
  { label: 'Sports', path: '/campus/sports', icon: Trophy },
  { label: 'Events', path: '/campus/events', icon: PartyPopper },
];

export default function CampusLayout() {
  return (
    <div className="page-transition min-h-screen pb-20">
      <Breadcrumb />
      <div className="container mx-auto pt-4">
        <div className="text-center mb-10">
          <h1 className="section-title mb-3">Campus <span className="gradient-text">Life</span></h1>
          <p className="section-subtitle">Experience the vibrant culture and facilities at QISCET</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {tabs.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
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
