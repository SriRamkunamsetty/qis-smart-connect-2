export default function MapSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h2 className="section-title">Find <span className="gradient-text">Us</span></h2>
          <p className="section-subtitle">Located in Ongole, Andhra Pradesh</p>
        </div>
        <div className="rounded-3xl overflow-hidden border border-border shadow-card h-80 md:h-96 relative">
          <div className="absolute inset-0 bg-gradient-hero flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 animate-float shadow-glow">
                <span className="text-2xl">📍</span>
              </div>
              <h3 className="font-grotesk font-bold text-xl mb-2">QISCET Campus</h3>
              <p className="text-muted-foreground text-sm">Ongole, Prakasam District, Andhra Pradesh - 523272</p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-5 inline-flex"
              >
                Open in Google Maps
              </a>
            </div>
          </div>
          {/* Decorative grid */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>
      </div>
    </section>
  );
}
