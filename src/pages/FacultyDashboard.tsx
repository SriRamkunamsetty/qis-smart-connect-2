import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Users, BarChart3, LogOut, AlertTriangle } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import PerformanceRiskPanel from '@/components/risk/PerformanceRiskPanel';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  branch: string;
  academicYear: string;
  section: string;
  attendance: number;
  cgpa: number;
  riskLevel?: string;
  riskScore?: number;
}

export default function FacultyDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [branchFilter, setBranchFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (!user?.uid) return;

    setLoading(true);

    // Filter by branch if it's set in state or from the faculty's assigned branch
    const effectiveBranch = branchFilter || user.branch;

    let q = query(collection(db, 'students'));
    if (effectiveBranch) {
      q = query(q, where('branch', '==', effectiveBranch));
    }
    if (yearFilter) {
      q = query(q, where('academicYear', '==', yearFilter));
    }

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const studentList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Student));
      setStudents(studentList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.uid, branchFilter, yearFilter, user.branch]);

  const shortageStudents = students.filter(s => (s.attendance || 0) < 75);
  const avgCGPA = students.length ? (students.reduce((a, s) => a + (s.cgpa || 0), 0) / students.length).toFixed(2) : '0';
  const avgAttendance = students.length ? (students.reduce((a, s) => a + (s.attendance || 0), 0) / students.length).toFixed(1) : '0';

  // CGPA distribution
  const cgpaRanges = ['0-4', '4-6', '6-7', '7-8', '8-9', '9-10'];
  const cgpaDist = cgpaRanges.map(range => {
    const [min, max] = range.split('-').map(Number);
    return { range, count: students.filter(s => s.cgpa >= min && s.cgpa < max).length };
  });
  const maxCount = Math.max(...cgpaDist.map(d => d.count), 1);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-grotesk font-bold text-2xl">Faculty Dashboard</h1>
            <p className="text-sm text-muted-foreground">Welcome, {user?.name || 'Faculty'} · Branch: <span className="text-primary font-semibold">{user?.branch || 'General'}</span></p>
          </div>
          <button onClick={() => { logout(); navigate('/'); }} className="btn-outline text-sm">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Students', value: students.length, color: 'text-primary' },
            { label: 'Avg CGPA', value: avgCGPA, color: 'text-green-500' },
            { label: 'Avg Attendance', value: `${avgAttendance}%`, color: 'text-amber-500' },
            { label: 'Attendance Shortage', value: shortageStudents.length, color: 'text-destructive' },
          ].map(s => (
            <div key={s.label} className="feature-card">
              <p className={`text-2xl font-grotesk font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <select value={branchFilter} onChange={e => setBranchFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-muted border border-border text-sm">
            <option value="">{user?.branch ? `Only My Branch (${user.branch})` : 'All Branches'}</option>
            {['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'CSD', 'AI&ML', 'IT'].map(b => <option key={b} value={b}>{b}</option>)}
          </select>
          <select value={yearFilter} onChange={e => setYearFilter(e.target.value)} className="px-3 py-2 rounded-xl bg-muted border border-border text-sm">
            <option value="">All Years</option>
            {['2021-2025', '2022-2026', '2023-2027', '2024-2028'].map(y => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* CGPA Distribution */}
          <div className="feature-card p-6">
            <div className="flex items-center gap-2 mb-5">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-sm">CGPA Distribution</h3>
            </div>
            <div className="space-y-2">
              {cgpaDist.map(d => (
                <div key={d.range} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-10">{d.range}</span>
                  <div className="flex-1 h-5 bg-muted rounded-lg overflow-hidden">
                    <div className="h-full bg-primary/70 rounded-lg transition-all" style={{ width: `${(d.count / maxCount) * 100}%` }} />
                  </div>
                  <span className="text-xs font-medium w-6 text-right">{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Attendance Shortage Alert */}
          <div className="feature-card p-6 lg:col-span-2">
            <div className="flex items-center gap-2 mb-5">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              <h3 className="font-semibold text-sm">Attendance Shortage ({shortageStudents.length})</h3>
            </div>
            {shortageStudents.length === 0 ? (
              <p className="text-sm text-muted-foreground">No students with attendance below 75%</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {['Roll No', 'Name', 'Branch', 'Attendance'].map(h => (
                        <th key={h} className="text-left px-3 py-2 text-xs font-semibold text-muted-foreground">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {shortageStudents.slice(0, 10).map(s => (
                      <tr key={s.id} className="border-b border-border last:border-0">
                        <td className="px-3 py-2 font-mono text-xs text-primary">{s.rollNumber}</td>
                        <td className="px-3 py-2">{s.name}</td>
                        <td className="px-3 py-2 text-muted-foreground">{s.branch}</td>
                        <td className="px-3 py-2 text-destructive font-semibold">{s.attendance}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Performance Risk Prediction */}
        <div className="mt-6">
          <PerformanceRiskPanel students={students.map(s => ({
            id: s.id,
            name: s.name,
            roll_number: s.rollNumber,
            branch: s.branch,
            academic_year: s.academicYear,
            section: s.section,
            attendance_percent: s.attendance,
            cgpa: s.cgpa,
          }))} />
        </div>

        {/* Full Student List */}
        <div className="feature-card mt-6 overflow-x-auto">
          <div className="flex items-center gap-2 p-5 border-b border-border">
            <Users className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-sm">Student List ({students.length})</h3>
          </div>
          {loading ? (
            <div className="p-8 text-center text-muted-foreground">Loading...</div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['Roll No', 'Name', 'Branch', 'Year', 'Section', 'Attendance', 'CGPA', 'Risk'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map(s => (
                  <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{s.rollNumber}</td>
                    <td className="px-4 py-3 font-medium">{s.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.branch}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{s.academicYear}</td>
                    <td className="px-4 py-3 text-muted-foreground">{s.section}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-medium ${(s.attendance || 0) < 75 ? 'text-destructive' : 'text-green-500'}`}>
                        {s.attendance || 0}%
                      </span>
                    </td>
                    <td className="px-4 py-3 font-semibold">{s.cgpa || 0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${s.riskLevel === 'High Risk' ? 'bg-rose-500/10 text-rose-500' :
                          s.riskLevel === 'Moderate Risk' ? 'bg-amber-500/10 text-amber-500' :
                            'bg-green-500/10 text-green-500'
                        }`}>
                        {s.riskLevel || 'Safe'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
