import { Building, Bus, MapPin } from 'lucide-react';
import { hostelData } from '@/data/extendedData';

export default function HostelTransport() {
  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Hostel & <span className="gradient-text">Transport</span></h1>
          <p className="section-subtitle">Comfortable living and convenient commute facilities</p>
        </div>

        {/* Hostel Section */}
        <div className="mb-14">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-grotesk font-bold text-xl">Hostel Accommodation</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {hostelData.hostels.map(h => {
              const available = h.capacity - h.occupied;
              const pct = (h.occupied / h.capacity) * 100;
              return (
                <div key={h.name} className="feature-card">
                  <h4 className="font-semibold text-sm mb-3">{h.name}</h4>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p>Type: <span className="text-foreground font-medium">{h.type}</span></p>
                    <p>Fee: <span className="text-foreground font-medium">₹{h.fee.toLocaleString()}/yr</span></p>
                    <div className="flex items-center gap-2">
                      <span>Availability:</span>
                      <span className={`font-medium ${available > 10 ? 'text-green-500' : available > 0 ? 'text-amber-500' : 'text-destructive'}`}>
                        {available} rooms
                      </span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div
                        className={`h-full rounded-full transition-all ${pct > 90 ? 'bg-destructive' : pct > 70 ? 'bg-amber-500' : 'bg-green-500'}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <p className="text-[10px]">{h.occupied}/{h.capacity} occupied</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transport Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Bus className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-grotesk font-bold text-xl">Transport Routes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hostelData.transport.map(t => (
              <div key={t.route} className="feature-card flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <MapPin className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm mb-1">{t.route}</h4>
                  <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span>📏 {t.distance}</span>
                    <span>🚏 {t.stops} stops</span>
                    <span>💰 ₹{t.fee.toLocaleString()}/yr</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
