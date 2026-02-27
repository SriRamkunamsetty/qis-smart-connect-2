import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { insightsData } from '@/data/extendedData';
import { TrendingUp, Users, GraduationCap, Building2 } from 'lucide-react';

const COLORS = ['hsl(210, 100%, 52%)', 'hsl(340, 80%, 55%)', 'hsl(160, 80%, 45%)', 'hsl(30, 90%, 55%)'];

export default function InsightsDashboard() {
  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Data <span className="gradient-text">Insights</span></h1>
          <p className="section-subtitle">Institutional analytics and growth trends</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: GraduationCap, label: 'Total Students', value: '12,500+', color: 'text-primary' },
            { icon: TrendingUp, label: 'Placement Rate', value: '94%', color: 'text-green-500' },
            { icon: Users, label: 'Faculty Members', value: '380+', color: 'text-purple-500' },
            { icon: Building2, label: 'Departments', value: '12', color: 'text-amber-500' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="feature-card text-center">
              <Icon className={`w-6 h-6 ${color} mx-auto mb-2`} />
              <p className={`font-grotesk font-bold text-2xl ${color}`}>{value}</p>
              <p className="text-xs text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Admission Growth */}
          <div className="feature-card p-6">
            <h3 className="font-semibold mb-4">Admission Growth Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={insightsData.admissionGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="students" stroke={COLORS[0]} strokeWidth={3} dot={{ r: 5, fill: COLORS[0] }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Placement Trend */}
          <div className="feature-card p-6">
            <h3 className="font-semibold mb-4">Average Package Trend (LPA)</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={insightsData.placementTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="year" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="avgPackage" fill={COLORS[0]} radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gender Ratio */}
          <div className="feature-card p-6">
            <h3 className="font-semibold mb-4">Gender Ratio</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={insightsData.genderRatio} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {insightsData.genderRatio.map((_, i) => (
                      <Cell key={i} fill={COLORS[i]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Department Strength */}
          <div className="feature-card p-6">
            <h3 className="font-semibold mb-4">Department Strength</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={insightsData.departmentStrength} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis dataKey="dept" type="category" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} width={50} />
                  <Tooltip contentStyle={{ background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: '12px', fontSize: '12px' }} />
                  <Bar dataKey="students" radius={[0, 6, 6, 0]}>
                    {insightsData.departmentStrength.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
