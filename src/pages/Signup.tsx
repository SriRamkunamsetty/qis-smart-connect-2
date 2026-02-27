import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, GraduationCap, Loader2, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: '8+ characters', pass: password.length >= 8 },
    { label: 'Uppercase', pass: /[A-Z]/.test(password) },
    { label: 'Number', pass: /[0-9]/.test(password) },
    { label: 'Special char', pass: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = checks.filter(c => c.pass).length;
  const colors = ['bg-destructive', 'bg-orange-500', 'bg-amber-500', 'bg-green-500'];
  const labels = ['Weak', 'Fair', 'Good', 'Strong'];

  if (!password) return null;
  return (
    <div className="mt-2">
      <div className="flex gap-1 mb-1.5">
        {[0, 1, 2, 3].map(i => (
          <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < score ? colors[score - 1] : 'bg-muted'}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className={`text-xs ${score < 2 ? 'text-destructive' : score < 3 ? 'text-amber-500' : 'text-green-500'}`}>
          {labels[score - 1] || 'Too weak'}
        </span>
        <div className="flex gap-2">
          {checks.map(c => (
            <span key={c.label} className={`text-xs flex items-center gap-0.5 ${c.pass ? 'text-green-500' : 'text-muted-foreground'}`}>
              {c.pass && <Check className="w-3 h-3" />}
              {c.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '', role: 'student' as 'student' | 'admin' | 'faculty' });
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.password !== form.confirm) return;
    setLoading(true);
    try {
      await signup(form.name, form.email, form.password, form.role);
      navigate(form.role === 'admin' ? '/admin-dashboard' : form.role === 'faculty' ? '/faculty/dashboard' : '/student-dashboard');
    } finally {
      setLoading(false);
    }
  };

  const update = (field: string, value: string) => setForm(f => ({ ...f, [field]: value }));

  return (
    <div className="page-transition min-h-screen flex items-center justify-center py-20 px-4">
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(hsl(var(--primary)) 1.5px, transparent 1.5px)',
        backgroundSize: '32px 32px'
      }} />

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow animate-float">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <h1 className="font-grotesk font-bold text-2xl">Create Account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join the QISCET community today</p>
        </div>

        <div className="feature-card p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={e => update('name', e.target.value)}
                placeholder="John Doe"
                required
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                value={form.email}
                onChange={e => update('email', e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPwd ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => update('password', e.target.value)}
                  placeholder="Create a strong password"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <PasswordStrength password={form.password} />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={e => update('confirm', e.target.value)}
                placeholder="Repeat your password"
                required
                className={`w-full px-4 py-3 rounded-xl bg-muted border focus:ring-1 outline-none text-sm transition-all ${
                  form.confirm && form.password !== form.confirm
                    ? 'border-destructive focus:ring-destructive'
                    : 'border-border focus:border-primary focus:ring-primary'
                }`}
              />
              {form.confirm && form.password !== form.confirm && (
                <p className="text-xs text-destructive mt-1.5">Passwords do not match</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">I am a...</label>
              <select
                value={form.role}
                onChange={e => update('role', e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-muted border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
              >
                <option value="student">🎓 Student</option>
                <option value="faculty">👨‍🏫 Faculty</option>
                <option value="admin">🧑‍💼 Admin / Staff</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading || (!!form.confirm && form.password !== form.confirm)}
              className="btn-primary w-full justify-center disabled:opacity-40"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
