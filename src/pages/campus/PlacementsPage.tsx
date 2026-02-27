import { placements } from '@/data/dummyData';
import { companyData, getLogoUrl } from '@/data/companyData';
import { TrendingUp, Award, Users, BarChart3 } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import PlacementComparison from '@/components/placement/PlacementComparison';

export default function PlacementsPage() {
  return (
    <div className="animate-fade-in space-y-10">
      {/* Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: 'Placement Rate', value: '94%', color: 'text-green-500' },
          { icon: Award, label: 'Highest Package', value: placements.highestPackage, color: 'text-amber-500' },
          { icon: BarChart3, label: 'Avg Package', value: placements.avgPackage, color: 'text-blue-500' },
          { icon: Users, label: 'Students Placed', value: `${placements.placedStudents}+`, color: 'text-primary' },
        ].map(({ icon: Icon, label, value, color }) => (
          <div key={label} className="feature-card text-center">
            <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
            <p className="text-2xl font-grotesk font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>

      {/* Company logos */}
      <div>
        <h3 className="font-grotesk font-semibold text-lg mb-4 text-center">Top Recruiting Companies</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {companyData.map(company => (
            <Tooltip key={company.name}>
              <TooltipTrigger asChild>
                <div className="feature-card flex flex-col items-center justify-center py-5 group cursor-default hover:scale-105 transition-transform">
                  <img
                    src={getLogoUrl(company.domain)}
                    alt={`${company.name} logo`}
                    className="w-10 h-10 object-contain mb-2"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <span className="text-xs font-medium group-hover:text-primary transition-colors">{company.name}</span>
                </div>
              </TooltipTrigger>
              <TooltipContent className="p-3">
                <p className="font-semibold">{company.name}</p>
                <p className="text-xs">Avg: {company.avgPackage} | Placed: {company.studentsPlaced || 'N/A'}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </div>

      <PlacementComparison />
    </div>
  );
}
