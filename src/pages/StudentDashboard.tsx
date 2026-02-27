import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Bell, CreditCard, Calendar, BookOpen, ClipboardList, GraduationCap, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { notices } from '../data/dummyData';
import DigitalIDCard from '@/components/idcard/DigitalIDCard';

export default function StudentDashboard() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  const statusSteps = [
    { label: 'Application Submitted', done: true },
    { label: 'Document Verification', done: true },
    { label: 'Merit Evaluation', done: false },
    { label: 'Seat Allotment', done: false },
  ];

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        {/* Welcome */}
        <div className="glass-card rounded-3xl p-8 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="relative z-10">
            <p className="text-sm text-muted-foreground mb-1">Welcome back 👋</p>
            <h1 className="font-grotesk font-bold text-3xl mb-2">{user?.name || 'Student'}</h1>
            <p className="text-muted-foreground text-sm">Application ID: <span className="text-primary font-mono font-semibold">QISCET-2025-4821</span></p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Application Status */}
          <div className="feature-card md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <ClipboardList className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-grotesk font-semibold">Application Status</h3>
            </div>
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
              <div className="space-y-4">
                {statusSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-4 pl-10 relative">
                    <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 ${step.done ? 'bg-primary border-primary' : 'bg-background border-border'} -translate-x-1/2`} />
                    <div className={`flex items-center gap-2 text-sm ${step.done ? 'text-foreground' : 'text-muted-foreground'}`}>
                      {step.done
                        ? <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        : i === statusSteps.filter(s => s.done).length
                        ? <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />
                        : <AlertCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                      }
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Digital ID Card */}
          <DigitalIDCard />

          {/* Payment Status */}
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="font-grotesk font-semibold">Payment</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Application Fee</span>
                <span className="text-green-500 font-medium flex items-center gap-1"><CheckCircle className="w-3.5 h-3.5" /> Paid</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tuition Fee</span>
                <span className="text-amber-500 font-medium flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> Pending</span>
              </div>
              <div className="pt-3 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Due by March 15, 2025</p>
                <button className="btn-primary text-xs w-full justify-center py-2.5">Pay Now</button>
              </div>
            </div>
          </div>

          {/* Notices */}
          <div className="feature-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-grotesk font-semibold">Notices</h3>
            </div>
            <div className="space-y-3">
              {notices.slice(0, 3).map(n => (
                <div key={n.id} className="flex items-start gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${n.urgent ? 'bg-destructive' : 'bg-primary'}`} />
                  <div>
                    <p className="text-xs font-medium leading-snug">{n.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{n.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Events */}
          <div className="feature-card md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-purple-500" />
              </div>
              <h3 className="font-grotesk font-semibold">Registered Events</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'TechFest 2025', date: 'Mar 5-7', type: 'Technical', color: 'bg-blue-500/10 text-blue-600' },
                { name: 'Hackathon 2025', date: 'Mar 15', type: 'Coding', color: 'bg-green-500/10 text-green-600' },
                { name: 'Sports Meet', date: 'Mar 22', type: 'Sports', color: 'bg-orange-500/10 text-orange-600' },
              ].map(ev => (
                <div key={ev.name} className="flex items-center gap-3 p-3 rounded-xl bg-muted">
                  <div className={`w-10 h-10 rounded-xl ${ev.color} flex items-center justify-center flex-shrink-0`}>
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{ev.name}</p>
                    <p className="text-xs text-muted-foreground">{ev.date} · {ev.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
