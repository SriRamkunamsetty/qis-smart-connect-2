import { useMemo } from 'react';
import { AlertTriangle, TrendingDown, Eye, ShieldAlert } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  roll_number: string;
  branch: string;
  academic_year: string;
  section: string;
  attendance_percent: number;
  cgpa: number;
}

interface RiskStudent extends Student {
  riskScore: number;
  riskLevel: 'critical' | 'high' | 'medium';
  reasons: string[];
}

function assessRisk(student: Student): RiskStudent | null {
  const reasons: string[] = [];
  let riskScore = 0;

  // Attendance risk
  const attendance = student.attendance_percent || 0;
  if (attendance < 50) { riskScore += 40; reasons.push(`Very low attendance: ${attendance}%`); }
  else if (attendance < 65) { riskScore += 25; reasons.push(`Low attendance: ${attendance}%`); }
  else if (attendance < 75) { riskScore += 15; reasons.push(`Below threshold attendance: ${attendance}%`); }

  // CGPA risk
  const cgpa = student.cgpa || 0;
  if (cgpa < 4) { riskScore += 40; reasons.push(`Critical CGPA: ${cgpa}`); }
  else if (cgpa < 5.5) { riskScore += 25; reasons.push(`Low CGPA: ${cgpa}`); }
  else if (cgpa < 6.5) { riskScore += 12; reasons.push(`Below average CGPA: ${cgpa}`); }

  // Combined risk amplifier
  if (attendance < 65 && cgpa < 5.5) { riskScore += 15; reasons.push('Combined low attendance & CGPA'); }

  if (riskScore < 15) return null;

  const riskLevel = riskScore >= 50 ? 'critical' : riskScore >= 30 ? 'high' : 'medium';
  return { ...student, riskScore, riskLevel, reasons };
}

export default function PerformanceRiskPanel({ students }: { students: Student[] }) {
  const atRiskStudents = useMemo(() => {
    return students
      .map(assessRisk)
      .filter((s): s is RiskStudent => s !== null)
      .sort((a, b) => b.riskScore - a.riskScore);
  }, [students]);

  const critical = atRiskStudents.filter(s => s.riskLevel === 'critical');
  const high = atRiskStudents.filter(s => s.riskLevel === 'high');
  const medium = atRiskStudents.filter(s => s.riskLevel === 'medium');

  if (atRiskStudents.length === 0) {
    return (
      <div className="feature-card p-6">
        <div className="flex items-center gap-2 mb-3">
          <ShieldAlert className="w-5 h-5 text-green-500" />
          <h3 className="font-semibold text-sm">Performance Risk</h3>
        </div>
        <p className="text-sm text-muted-foreground">✅ No at-risk students detected</p>
      </div>
    );
  }

  return (
    <div className="feature-card p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <h3 className="font-semibold text-sm">Performance Risk Prediction</h3>
        </div>
        <span className="text-xs px-2.5 py-1 rounded-full bg-destructive/10 text-destructive font-medium">
          {atRiskStudents.length} at-risk
        </span>
      </div>

      {/* Risk summary badges */}
      <div className="flex gap-3 mb-5">
        {[
          { label: 'Critical', count: critical.length, color: 'bg-destructive/10 text-destructive' },
          { label: 'High', count: high.length, color: 'bg-orange-500/10 text-orange-600' },
          { label: 'Medium', count: medium.length, color: 'bg-amber-500/10 text-amber-600' },
        ].filter(b => b.count > 0).map(badge => (
          <div key={badge.label} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${badge.color}`}>
            <span className="font-bold">{badge.count}</span> {badge.label}
          </div>
        ))}
      </div>

      {/* Risk Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {['Risk', 'Roll No', 'Name', 'Branch', 'Attendance', 'CGPA', 'Reasons'].map(h => (
                <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {atRiskStudents.slice(0, 15).map(s => (
              <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                <td className="px-3 py-2.5">
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                    s.riskLevel === 'critical' ? 'bg-destructive/10 text-destructive' :
                    s.riskLevel === 'high' ? 'bg-orange-500/10 text-orange-600' :
                    'bg-amber-500/10 text-amber-600'
                  }`}>
                    {s.riskLevel === 'critical' ? <AlertTriangle className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {s.riskLevel}
                  </span>
                </td>
                <td className="px-3 py-2.5 font-mono text-xs text-primary">{s.roll_number}</td>
                <td className="px-3 py-2.5 font-medium">{s.name}</td>
                <td className="px-3 py-2.5 text-muted-foreground">{s.branch}</td>
                <td className={`px-3 py-2.5 font-semibold ${s.attendance_percent < 65 ? 'text-destructive' : 'text-amber-500'}`}>
                  {s.attendance_percent}%
                </td>
                <td className={`px-3 py-2.5 font-semibold ${s.cgpa < 5 ? 'text-destructive' : 'text-amber-500'}`}>
                  {s.cgpa}
                </td>
                <td className="px-3 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {s.reasons.slice(0, 2).map((r, i) => (
                      <span key={i} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{r}</span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
