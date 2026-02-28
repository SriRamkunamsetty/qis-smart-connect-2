import { useState, useEffect } from 'react';
import { Bell, ChevronRight, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { noticeService, Notice } from '../services/noticeService';
import { onSnapshot } from 'firebase/firestore';

export default function NoticeBoard() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  const categoryColors: Record<string, string> = {
    Academic: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    Placement: 'bg-green-500/10 text-green-600 dark:text-green-400',
    Sports: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    Events: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    Finance: 'bg-red-500/10 text-red-600 dark:text-red-400',
    General: 'bg-slate-500/10 text-slate-600 dark:text-slate-400',
  };

  useEffect(() => {
    const q = noticeService.getNotices('All', 5);
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedNotices = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notice));
      setNotices(fetchedNotices);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
              <Bell className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-grotesk font-bold text-xl">Notice Board</h2>
              <p className="text-xs text-muted-foreground">Latest announcements</p>
            </div>
          </div>
          <Link to="/notices" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-10">
            <Clock className="w-6 h-6 text-primary animate-spin" />
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-10 bg-muted/30 rounded-2xl border border-dashed border-border">
            <p className="text-sm text-muted-foreground">No recent notices</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notices.map((notice, i) => (
              <Link
                key={notice.id}
                to={`/notice/${notice.id}`}
                className="feature-card flex items-start gap-4 animate-fade-in hover:border-primary/30 transition-all p-4"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {notice.priority === 'High' ? (
                  <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{notice.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notice.date}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${categoryColors[notice.category] || 'bg-muted text-muted-foreground'}`}>
                  {notice.category}
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
