import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Star } from 'lucide-react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/3 blur-3xl" />
      </div>

      {/* Decorative dots */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(hsl(var(--primary)) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border border-primary/20 mb-8 animate-fade-in-up">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-medium text-muted-foreground">Autonomous Institution</span>
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="text-xs font-medium text-primary">Approved by AICTE | Affiliated to JNTU Kakinada</span>
          </div>

          {/* Heading */}
          <h1
            className="font-grotesk text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up leading-[1.08]"
            style={{ animationDelay: '0.1s' }}
          >
            Where Innovation
            <br />
            <span className="gradient-text">Meets Education</span>
          </h1>

          <p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Empowering students with world-class education, cutting-edge research facilities,
            and industry connections that launch extraordinary careers.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <Link to="/admission" className="btn-primary text-base px-8 py-4">
              Apply for 2025
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/academics" className="btn-outline text-base px-8 py-4">
              <Play className="w-4 h-4" />
              Explore Programs
            </Link>
          </div>

          {/* Social proof */}
          <div
            className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-6 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <div className="flex -space-x-3">
              {[
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&fit=crop',
                'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop',
                'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=40&h=40&fit=crop',
                'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop',
              ].map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  className="w-10 h-10 rounded-full border-2 border-background object-cover"
                />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-white text-xs font-bold">
                12K
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              <span className="text-foreground font-semibold">12,500+ students</span> trust QISCET for their future
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
