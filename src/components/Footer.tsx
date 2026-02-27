import { Link } from 'react-router-dom';
import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  Academics: [
    { label: 'Departments', path: '/academics' },
    { label: 'Faculty', path: '/academics/faculty' },
    { label: 'Research', path: '/academics/research' },
    { label: 'Library', path: '/academics/library' },
  ],
  Admissions: [
    { label: 'Apply Now', path: '/admission' },
    { label: 'Fee Structure', path: '/admission/fees' },
    { label: 'Scholarships', path: '/admission/scholarships' },
    { label: 'FAQs', path: '/admission/faqs' },
  ],
  Campus: [
    { label: 'Gallery', path: '/campus/gallery' },
    { label: 'Placements', path: '/campus/placements' },
    { label: 'Sports', path: '/campus/sports' },
    { label: 'Events', path: '/campus/events' },
  ],
};

const socials = [
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center shadow-glow">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="font-grotesk font-bold text-lg gradient-text">QISCET</span>
                <p className="text-xs text-muted-foreground">Autonomous | Approved by AICTE | Affiliated to JNTU Kakinada</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-sm">
              QIS College of Engineering and Technology — empowering the next generation of innovators
              with cutting-edge technology, world-class faculty, and an ecosystem that transforms ideas into reality.
            </p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Ongole, Prakasam District, Andhra Pradesh - 523272</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                <span>+91 80 2345 6789</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                <span>info@qiscet.edu.in</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-grotesk font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(link => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2025 QIS College of Engineering and Technology. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-border text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
