import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, GraduationCap, Search, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import GlobalSearch from './search/GlobalSearch';

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Academics', path: '/academics' },
  { label: 'Admissions', path: '/admission' },
  { label: 'Campus', path: '/campus/gallery' },
  { label: 'Faculty', path: '/faculty' },
  {
    label: 'More',
    path: '#',
    children: [
      { label: 'Hostel & Transport', path: '/hostel-transport' },
      { label: 'Internships', path: '/internships' },
      { label: 'Resume Builder', path: '/resume-builder' },
      { label: 'Data Insights', path: '/insights' },
      { label: 'Contact', path: '/contact' },
    ],
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-card shadow-card py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform duration-300">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-grotesk font-bold text-base gradient-text">QISCET</span>
              <p className="text-[10px] text-muted-foreground leading-none hidden sm:block">Autonomous | AICTE | JNTU Kakinada</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-5">
            {navLinks.map(link =>
              link.children ? (
                <div key={link.label} className="relative">
                  <button onClick={() => setMoreOpen(!moreOpen)} className="nav-link flex items-center gap-1">
                    {link.label}
                    <ChevronDown className={`w-3 h-3 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {moreOpen && (
                    <div className="absolute top-full right-0 mt-2 w-52 feature-card p-2 animate-fade-in z-50">
                      {link.children.map(child => (
                        <Link key={child.path} to={child.path} className={`block px-4 py-2.5 rounded-xl text-sm transition-all ${isActive(child.path) ? 'bg-primary/10 text-primary font-medium' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link key={link.path} to={link.path} className={`nav-link ${isActive(link.path) ? 'active' : ''}`}>
                  {link.label}
                </Link>
              )
            )}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors" title="Search (Ctrl+K)">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            {user ? (
              <div className="flex items-center gap-3">
                <Link to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'faculty' ? '/faculty/dashboard' : '/student-dashboard'} className="btn-outline text-xs px-4 py-2">Dashboard</Link>
                <button onClick={logout} className="text-sm text-muted-foreground hover:text-foreground transition-colors">Logout</button>
              </div>
            ) : (
              <Link to="/login" className="btn-primary text-xs px-5 py-2.5">Login</Link>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button onClick={() => setSearchOpen(true)} className="p-2 rounded-xl border border-border hover:bg-muted transition-colors">
              <Search className="w-4 h-4" />
            </button>
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 rounded-xl border border-border transition-colors hover:bg-muted">
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden glass-card border-t border-border mt-2 mx-4 rounded-2xl p-5 animate-fade-in">
            <nav className="flex flex-col gap-1">
              {navLinks.map(link =>
                link.children ? (
                  <div key={link.label}>
                    <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{link.label}</p>
                    {link.children.map(child => (
                      <Link key={child.path} to={child.path} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 block ${isActive(child.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link key={link.path} to={link.path} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${isActive(link.path) ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}>
                    {link.label}
                  </Link>
                )
              )}
              <div className="pt-3 border-t border-border mt-2">
                {user ? (
                  <>
                    <Link to={user.role === 'admin' ? '/admin-dashboard' : user.role === 'faculty' ? '/faculty/dashboard' : '/student-dashboard'} className="block px-4 py-3 rounded-xl text-sm font-medium bg-primary/10 text-primary mb-2">Dashboard</Link>
                    <button onClick={logout} className="w-full text-left px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-muted">Logout</button>
                  </>
                ) : (
                  <Link to="/login" className="btn-primary w-full justify-center text-sm">Login</Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
