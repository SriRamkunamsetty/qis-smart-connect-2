import { NavigationPanel } from './navigation/NavigationPanel';

export default function MapSection() {
  return (
    <section className="py-20 relative overflow-hidden" id="navigation">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title mb-4">Live <span className="gradient-text">Navigation</span></h2>
          <p className="section-subtitle">Real-time directions to our campus from your current location</p>
        </div>

        <div className="max-w-5xl mx-auto">
          <NavigationPanel />
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl border-emerald-500/10">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Main Campus
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Ongole, Prakasam District,<br />
              Andhra Pradesh - 523272
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-amber-500/10">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Contact Info
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Phone: +91 91234 56789<br />
              Email: info@qiscet.edu.in
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl border-primary/10">
            <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Office Hours
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed font-medium">
              Mon - Sat: 9:00 AM - 5:00 PM<br />
              Sunday: Closed
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
