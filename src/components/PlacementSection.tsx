import { placements } from '../data/dummyData';
import { companyData, getLogoUrl } from '../data/companyData';
import { Link } from 'react-router-dom';
import { TrendingUp, Award, Users } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export default function PlacementSection() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="section-title">Placement <span className="gradient-text">Excellence</span></h2>
          <p className="section-subtitle">Our graduates are building the future at top companies worldwide</p>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {[
            { icon: TrendingUp, label: 'Placement Rate', value: '94%', color: 'text-green-500' },
            { icon: Award, label: 'Highest Package', value: placements.highestPackage, color: 'text-amber-500' },
            { icon: Users, label: 'Students Placed', value: `${placements.placedStudents}+`, color: 'text-primary' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="feature-card flex items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center flex-shrink-0">
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <p className="text-2xl font-grotesk font-bold">{value}</p>
                <p className="text-sm text-muted-foreground">{label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Company logos */}
        <div className="glass-card rounded-2xl p-8">
          <p className="text-sm font-medium text-center text-muted-foreground mb-6">Top Recruiting Companies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {companyData.map(company => (
              <Tooltip key={company.name}>
                <TooltipTrigger asChild>
                  <div className="group px-5 py-3 rounded-xl bg-muted hover:bg-primary/10 hover:shadow-md transition-all duration-300 cursor-default flex items-center gap-3 hover:scale-105">
                    <img
                      src={getLogoUrl(company.domain)}
                      alt={`${company.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">
                      {company.name}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="p-3">
                  <p className="font-semibold">{company.name}</p>
                  <p className="text-xs">Avg Package: {company.avgPackage}</p>
                  <p className="text-xs">Students Placed: {company.studentsPlaced || 'N/A'}</p>
                  <p className="text-xs">Hiring Year: {company.hiringYear}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <Link to="/placements" className="btn-primary">
            View Full Placement Report
          </Link>
        </div>
      </div>
    </section>
  );
}
