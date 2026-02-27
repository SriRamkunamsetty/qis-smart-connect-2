import { placements, testimonials } from '../data/dummyData';
import { companyData, getLogoUrl } from '../data/companyData';
import { Award, TrendingUp, Users, Building2, Star } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import PlacementComparison from '@/components/placement/PlacementComparison';

export default function Placements() {
  const placementPct = Math.round((placements.placedStudents / placements.totalEligible) * 100);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-14">
          <h1 className="section-title mb-4">Placement <span className="gradient-text">Record</span></h1>
          <p className="section-subtitle">Our students join the world's most innovative companies</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-14">
          {[
            { icon: TrendingUp, label: 'Placement Rate', value: `${placementPct}%`, color: 'text-green-500', bg: 'bg-green-500/10' },
            { icon: Award, label: 'Highest Package', value: placements.highestPackage, color: 'text-amber-500', bg: 'bg-amber-500/10' },
            { icon: Users, label: 'Students Placed', value: `${placements.placedStudents}`, color: 'text-primary', bg: 'bg-primary/10' },
            { icon: Building2, label: 'Companies Visited', value: '200+', color: 'text-purple-500', bg: 'bg-purple-500/10' },
          ].map(({ icon: Icon, label, value, color, bg }) => (
            <div key={label} className="stat-card">
              <div className={`w-12 h-12 rounded-xl ${bg} flex items-center justify-center mx-auto mb-3`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="font-grotesk font-bold text-3xl gradient-text">{value}</p>
              <p className="text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Placement Bar */}
        <div className="feature-card mb-14 p-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-grotesk font-bold text-lg">Placement Overview 2024</h3>
              <p className="text-sm text-muted-foreground mt-1">{placements.placedStudents} out of {placements.totalEligible} eligible students placed</p>
            </div>
            <span className="text-3xl font-grotesk font-bold gradient-text">{placementPct}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-primary transition-all duration-1000"
              style={{ width: `${placementPct}%` }}
            />
          </div>
          <div className="grid grid-cols-3 gap-4 mt-6 text-center">
            {[
              { label: 'Avg Package', value: placements.avgPackage },
              { label: 'Highest Package', value: placements.highestPackage },
              { label: 'Median Package', value: '7.2 LPA' },
            ].map(item => (
              <div key={item.label}>
                <p className="font-grotesk font-bold text-xl">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Placement Comparison Tool */}
        <PlacementComparison />

        {/* Company Logos */}
        <div className="mb-14 mt-14">
          <h2 className="font-grotesk font-bold text-2xl text-center mb-8">Top <span className="gradient-text">Recruiters</span></h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {companyData.map(company => (
              <Tooltip key={company.name}>
                <TooltipTrigger asChild>
                  <div className="feature-card text-center py-5 hover:bg-primary/5 hover:border-primary/30 hover:scale-105 cursor-default transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-muted mx-auto mb-3 flex items-center justify-center overflow-hidden group-hover:shadow-md transition-shadow">
                      <img
                        src={getLogoUrl(company.domain)}
                        alt={`${company.name} logo`}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<span class="text-lg font-bold text-primary">${company.name.charAt(0)}</span>`;
                        }}
                      />
                    </div>
                    <p className="text-xs font-medium group-hover:text-primary transition-colors">{company.name}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-xs">Avg Package: {company.avgPackage}</p>
                  <p className="text-xs">Hiring Year: {company.hiringYear}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <h2 className="font-grotesk font-bold text-2xl text-center mb-8">Alumni <span className="gradient-text">Stories</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => (
              <div key={t.id} className="feature-card p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 italic">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={t.image} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-primary">{t.role} @ {t.company}</p>
                    <p className="text-xs text-muted-foreground">Batch {t.batch}</p>
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
