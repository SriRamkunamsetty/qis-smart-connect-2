import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Bell, Users, Image, TrendingUp, LogOut,
  Plus, BarChart3, Menu, X, Search, Edit, Trash2, UserPlus, Filter, Download
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const sidebarItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'students', label: 'Students', icon: Users },
  { id: 'notices', label: 'Notices', icon: Bell },
  { id: 'applications', label: 'Applications', icon: Users },
  { id: 'gallery', label: 'Gallery', icon: Image },
  { id: 'placements', label: 'Placements', icon: TrendingUp },
];

const branches = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'CSD', 'AI&ML', 'IT'];
const years = ['2021-2025', '2022-2026', '2023-2027', '2024-2028'];
const categories = ['General', 'OBC', 'SC', 'ST', 'EWS'];

interface Student {
  id: string;
  name: string;
  roll_number: string;
  branch: string;
  academic_year: string;
  section: string;
  category: string;
  email: string;
  phone: string;
  attendance_percent: number;
  cgpa: number;
}

const emptyStudent = {
  name: '', roll_number: '', branch: 'CSE', academic_year: '2024-2028',
  section: 'A', category: 'General', email: '', phone: '',
  attendance_percent: 0, cgpa: 0,
};

export default function AdminDashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Student management state
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyStudent);
  const [filters, setFilters] = useState({ branch: '', year: '', category: '', search: '' });

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const fetchStudents = useCallback(async () => {
    setLoadingStudents(true);
    let query = supabase.from('students').select('*').order('created_at', { ascending: false });
    if (filters.branch) query = query.eq('branch', filters.branch);
    if (filters.year) query = query.eq('academic_year', filters.year);
    if (filters.category) query = query.eq('category', filters.category);
    if (filters.search) query = query.or(`name.ilike.%${filters.search}%,roll_number.ilike.%${filters.search}%`);

    const { data, error } = await query;
    if (error) {
      toast({ title: 'Error loading students', description: error.message, variant: 'destructive' });
    } else {
      setStudents((data || []) as Student[]);
    }
    setLoadingStudents(false);
  }, [filters, toast]);

  useEffect(() => {
    if (activeTab === 'students') fetchStudents();
  }, [activeTab, fetchStudents]);

  const handleSave = async () => {
    if (!form.name || !form.roll_number) {
      toast({ title: 'Name and Roll Number are required', variant: 'destructive' });
      return;
    }
    if (editingId) {
      const { error } = await supabase.from('students').update({
        name: form.name, roll_number: form.roll_number, branch: form.branch,
        academic_year: form.academic_year, section: form.section, category: form.category,
        email: form.email, phone: form.phone,
        attendance_percent: form.attendance_percent, cgpa: form.cgpa,
        updated_at: new Date().toISOString(),
      }).eq('id', editingId);
      if (error) { toast({ title: 'Update failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Student updated' });
    } else {
      const { error } = await supabase.from('students').insert({
        name: form.name, roll_number: form.roll_number, branch: form.branch,
        academic_year: form.academic_year, section: form.section, category: form.category,
        email: form.email, phone: form.phone,
        attendance_percent: form.attendance_percent, cgpa: form.cgpa,
      });
      if (error) { toast({ title: 'Add failed', description: error.message, variant: 'destructive' }); return; }
      toast({ title: 'Student added' });
    }
    setShowForm(false);
    setEditingId(null);
    setForm(emptyStudent);
    fetchStudents();
  };

  const handleEdit = (s: Student) => {
    setForm({
      name: s.name, roll_number: s.roll_number, branch: s.branch,
      academic_year: s.academic_year, section: s.section || 'A',
      category: s.category || 'General', email: s.email || '',
      phone: s.phone || '', attendance_percent: s.attendance_percent || 0,
      cgpa: s.cgpa || 0,
    });
    setEditingId(s.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from('students').delete().eq('id', id);
    if (error) { toast({ title: 'Delete failed', description: error.message, variant: 'destructive' }); return; }
    toast({ title: 'Student deleted' });
    fetchStudents();
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const analyticsData = [
    { label: 'Total Students', value: students.length.toString(), change: '', color: 'text-primary' },
    { label: 'Avg CGPA', value: students.length ? (students.reduce((a, s) => a + (s.cgpa || 0), 0) / students.length).toFixed(2) : '0', change: '', color: 'text-green-500' },
    { label: 'Avg Attendance', value: students.length ? (students.reduce((a, s) => a + (s.attendance_percent || 0), 0) / students.length).toFixed(1) + '%' : '0%', change: '', color: 'text-amber-500' },
    { label: 'Branches', value: new Set(students.map(s => s.branch)).size.toString(), change: '', color: 'text-purple-500' },
  ];

  const exportCSV = () => {
    const headers = ['Name', 'Roll Number', 'Branch', 'Year', 'Section', 'Category', 'Email', 'Phone', 'Attendance%', 'CGPA'];
    const rows = students.map(s => [s.name, s.roll_number, s.branch, s.academic_year, s.section, s.category, s.email, s.phone, s.attendance_percent, s.cgpa]);
    const csv = [headers, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'students.csv'; a.click();
  };

  return (
    <div className="page-transition min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-sidebar border-r border-sidebar-border pt-16 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-5">
          <div className="flex items-center gap-3 mb-8 p-4 rounded-xl bg-sidebar-accent">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <span className="text-white font-bold text-sm">{user?.name?.charAt(0) || 'A'}</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-sidebar-foreground">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
          </div>

          <nav className="space-y-1">
            {sidebarItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => { setActiveTab(id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === id
                    ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-glow'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent'
                }`}
              >
                <Icon className="w-4 h-4" /> {label}
              </button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-5 right-5">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-muted-foreground hover:bg-sidebar-accent transition-colors">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main */}
      <main className="flex-1 lg:ml-64 p-6 pt-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden mr-4 p-2 rounded-lg border border-border"><Menu className="w-5 h-5" /></button>
            <h1 className="font-grotesk font-bold text-2xl inline">{sidebarItems.find(i => i.id === activeTab)?.label}</h1>
            <p className="text-sm text-muted-foreground mt-0.5">QIS College of Engineering & Technology</p>
          </div>
        </div>

        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6 animate-fade-in">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {analyticsData.map(item => (
                <div key={item.label} className="feature-card">
                  <p className={`text-3xl font-grotesk font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Student Management */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-fade-in">
            {/* Filters */}
            <div className="feature-card p-5">
              <div className="flex flex-wrap gap-3 items-center">
                <div className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by name or roll no..."
                    value={filters.search}
                    onChange={e => setFilters(f => ({ ...f, search: e.target.value }))}
                    className="flex-1 px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
                  />
                </div>
                <select value={filters.branch} onChange={e => setFilters(f => ({ ...f, branch: e.target.value }))} className="px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                  <option value="">All Branches</option>
                  {branches.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
                <select value={filters.year} onChange={e => setFilters(f => ({ ...f, year: e.target.value }))} className="px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                  <option value="">All Years</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={filters.category} onChange={e => setFilters(f => ({ ...f, category: e.target.value }))} className="px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                  <option value="">All Categories</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <button onClick={() => setFilters({ branch: '', year: '', category: '', search: '' })} className="text-xs text-muted-foreground hover:text-foreground">Clear</button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => { setForm(emptyStudent); setEditingId(null); setShowForm(true); }}
                className="btn-primary text-sm"
              >
                <UserPlus className="w-4 h-4" /> Add Student
              </button>
              <button onClick={exportCSV} className="btn-outline text-sm">
                <Download className="w-4 h-4" /> Export CSV
              </button>
            </div>

            {/* Add/Edit Form */}
            {showForm && (
              <div className="feature-card p-6 animate-fade-in">
                <h3 className="font-semibold mb-4">{editingId ? 'Edit Student' : 'Add New Student'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', type: 'text' },
                    { key: 'roll_number', label: 'Roll Number', type: 'text' },
                    { key: 'email', label: 'Email', type: 'email' },
                    { key: 'phone', label: 'Phone', type: 'tel' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="block text-xs font-medium mb-1">{f.label}</label>
                      <input
                        type={f.type}
                        value={(form as any)[f.key]}
                        onChange={e => setForm(prev => ({ ...prev, [f.key]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm"
                      />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-medium mb-1">Branch</label>
                    <select value={form.branch} onChange={e => setForm(f => ({ ...f, branch: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                      {branches.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Academic Year</label>
                    <select value={form.academic_year} onChange={e => setForm(f => ({ ...f, academic_year: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                      {years.map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Section</label>
                    <select value={form.section} onChange={e => setForm(f => ({ ...f, section: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                      {['A', 'B', 'C', 'D'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm">
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">Attendance %</label>
                    <input type="number" min={0} max={100} step={0.1} value={form.attendance_percent} onChange={e => setForm(f => ({ ...f, attendance_percent: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1">CGPA</label>
                    <input type="number" min={0} max={10} step={0.01} value={form.cgpa} onChange={e => setForm(f => ({ ...f, cgpa: Number(e.target.value) }))} className="w-full px-3 py-2 rounded-xl bg-muted border border-border text-sm" />
                  </div>
                </div>
                <div className="flex gap-3 mt-5">
                  <button onClick={handleSave} className="btn-primary text-sm">{editingId ? 'Update' : 'Add'} Student</button>
                  <button onClick={() => { setShowForm(false); setEditingId(null); }} className="btn-outline text-sm">Cancel</button>
                </div>
              </div>
            )}

            {/* Students Table */}
            <div className="feature-card overflow-x-auto">
              {loadingStudents ? (
                <div className="p-8 text-center text-muted-foreground">Loading...</div>
              ) : students.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No students found. Add your first student above.</p>
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      {['Roll No', 'Name', 'Branch', 'Year', 'Section', 'Attendance', 'CGPA', 'Actions'].map(h => (
                        <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {students.map(s => (
                      <tr key={s.id} className="border-b border-border last:border-0 hover:bg-muted/50 transition-colors">
                        <td className="px-4 py-3 font-mono text-xs text-primary">{s.roll_number}</td>
                        <td className="px-4 py-3 font-medium">{s.name}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.branch}</td>
                        <td className="px-4 py-3 text-muted-foreground text-xs">{s.academic_year}</td>
                        <td className="px-4 py-3 text-muted-foreground">{s.section}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-medium ${(s.attendance_percent || 0) < 75 ? 'text-destructive' : 'text-green-500'}`}>
                            {s.attendance_percent || 0}%
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold">{s.cgpa || 0}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleEdit(s)} className="p-1.5 rounded-lg hover:bg-primary/10 text-primary transition-colors"><Edit className="w-3.5 h-3.5" /></button>
                            <button onClick={() => handleDelete(s.id)} className="p-1.5 rounded-lg hover:bg-destructive/10 text-destructive transition-colors"><Trash2 className="w-3.5 h-3.5" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* Notices */}
        {activeTab === 'notices' && (
          <div className="space-y-6 animate-fade-in">
            <div className="feature-card p-6">
              <h3 className="font-semibold mb-5">Add New Notice</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Notice title..." className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm" />
                <textarea rows={3} placeholder="Notice content..." className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary outline-none text-sm resize-none" />
                <div className="flex gap-3">
                  <select className="px-4 py-3 rounded-xl bg-muted border border-border text-sm">
                    <option>Academic</option><option>Placement</option><option>Events</option><option>Sports</option>
                  </select>
                  <button className="btn-primary text-sm px-5 py-3 flex items-center gap-2"><Plus className="w-4 h-4" /> Post Notice</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="feature-card animate-fade-in overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  {['ID', 'Name', 'Department', 'Date', 'Status', 'Action'].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 'QISCET-4821', name: 'Arjun Sharma', dept: 'CSE', date: 'Feb 20', status: 'Pending' },
                  { id: 'QISCET-4822', name: 'Priya Nair', dept: 'ECE', date: 'Feb 21', status: 'Approved' },
                  { id: 'QISCET-4823', name: 'Rohan Patel', dept: 'MECH', date: 'Feb 22', status: 'Review' },
                ].map(app => (
                  <tr key={app.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                    <td className="px-4 py-3 font-mono text-xs text-primary">{app.id}</td>
                    <td className="px-4 py-3 font-medium">{app.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.dept}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${app.status === 'Approved' ? 'bg-green-500/10 text-green-600' : app.status === 'Pending' ? 'bg-amber-500/10 text-amber-600' : 'bg-blue-500/10 text-blue-600'}`}>{app.status}</span>
                    </td>
                    <td className="px-4 py-3"><button className="text-xs text-primary hover:underline">View</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {(activeTab === 'gallery' || activeTab === 'placements') && (
          <div className="feature-card p-8 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              {activeTab === 'gallery' ? <Image className="w-8 h-8 text-primary" /> : <TrendingUp className="w-8 h-8 text-primary" />}
            </div>
            <h3 className="font-grotesk font-bold text-xl mb-2 capitalize">{activeTab} Manager</h3>
            <p className="text-muted-foreground text-sm mb-6">Upload and manage {activeTab} content here.</p>
            <button className="btn-primary"><Plus className="w-4 h-4" /> Add Content</button>
          </div>
        )}
      </main>
    </div>
  );
}
