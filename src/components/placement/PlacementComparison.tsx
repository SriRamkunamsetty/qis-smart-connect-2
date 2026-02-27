import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { departmentPlacementData } from '@/data/extendedData';

const deptKeys = Object.keys(departmentPlacementData) as Array<keyof typeof departmentPlacementData>;
const COLORS = ['hsl(210, 100%, 52%)', 'hsl(195, 100%, 50%)', 'hsl(160, 80%, 45%)', 'hsl(30, 90%, 55%)'];

export default function PlacementComparison() {
  const [dept1, setDept1] = useState<keyof typeof departmentPlacementData>('cse');
  const [dept2, setDept2] = useState<keyof typeof departmentPlacementData>('ece');

  const d1 = departmentPlacementData[dept1];
  const d2 = departmentPlacementData[dept2];

  const barData = [
    { metric: 'Avg Package (LPA)', [d1.name]: d1.avgPackage, [d2.name]: d2.avgPackage },
    { metric: 'Placement %', [d1.name]: d1.placementPct, [d2.name]: d2.placementPct },
    { metric: 'Highest (LPA)', [d1.name]: d1.highestPackage, [d2.name]: d2.highestPackage },
  ];

  const pie1 = Object.entries(d1.companies).map(([name, value]) => ({ name, value }));
  const pie2 = Object.entries(d2.companies).map(([name, value]) => ({ name, value }));

  return (
    <div className="feature-card p-8 mt-12">
      <h3 className="font-grotesk font-bold text-2xl mb-2">
        Department <span className="gradient-text">Comparison</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-6">Compare placement stats between departments</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2">Department 1</label>
          <select
            value={dept1}
            onChange={e => setDept1(e.target.value as any)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
          >
            {deptKeys.map(k => (
              <option key={k} value={k}>{departmentPlacementData[k].name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Department 2</label>
          <select
            value={dept2}
            onChange={e => setDept2(e.target.value as any)}
            className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
          >
            {deptKeys.map(k => (
              <option key={k} value={k}>{departmentPlacementData[k].name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="mb-8">
        <h4 className="font-semibold text-sm mb-4">Package & Placement Comparison</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="metric" tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '12px',
                  fontSize: '12px',
                }}
              />
              <Bar dataKey={d1.name} fill={COLORS[0]} radius={[6, 6, 0, 0]} />
              <Bar dataKey={d2.name} fill={COLORS[1]} radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[{ data: pie1, label: d1.name }, { data: pie2, label: d2.name }].map(({ data, label }) => (
          <div key={label}>
            <h4 className="font-semibold text-sm mb-3 text-center">{label} — Company Distribution</h4>
            <div className="h-52">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={data} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                    {data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
