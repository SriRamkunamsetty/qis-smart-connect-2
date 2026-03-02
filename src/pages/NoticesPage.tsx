import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bell, AlertCircle, Clock, ChevronRight } from 'lucide-react';
import { noticeService, Notice } from '@/services/noticeService';

const categoryColors: Record<string, string> = {
  Academic: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  Placement: 'bg-green-500/10 text-green-600 dark:text-green-400',
  Sports: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  Events: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  Exam: 'bg-red-500/10 text-red-600 dark:text-red-400',
  Event: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  General: 'bg-muted text-muted-foreground',
};

const categories = ['All', 'Academic', 'Placement', 'Sports', 'Exam', 'Event', 'General'];

export default function NoticesPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await noticeService.getNotices(filter);
      setNotices(data);
      setLoading(false);
    };
    fetch();
  }, [filter]);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Bell className="w-4 h-4" />
            Notices
          </div>
          <h1 className="font-grotesk font-bold text-4xl md:text-5xl mb-3">
            Notice <span className="gradient-text">Board</span>
          </h1>
          <p className="text-muted-foreground">Stay updated with the latest announcements</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === cat ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Clock className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : notices.length === 0 ? (
          <div className="text-center py-20 bg-muted/30 rounded-2xl border border-dashed border-border">
            <p className="text-muted-foreground">No notices found for this category.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notices.map((notice, i) => (
              <Link
                key={notice.id}
                to={`/notice/${notice.id}`}
                className="feature-card flex items-start gap-4 animate-fade-in hover:border-primary/30 transition-all p-5 block"
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                {notice.priority === 'High' ? (
                  <AlertCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold">{notice.title}</h3>
                    {notice.pinned && <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-medium">📌 Pinned</span>}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{notice.description}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">{notice.date}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryColors[notice.category] || 'bg-muted text-muted-foreground'}`}>
                      {notice.category}
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
