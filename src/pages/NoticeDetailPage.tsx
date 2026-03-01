import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, AlertCircle } from 'lucide-react';
import { noticeService, Notice } from '@/services/noticeService';

export default function NoticeDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [notice, setNotice] = useState<Notice | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const data = await noticeService.getNoticeById(id);
      setNotice(data);
      setLoading(false);
    };
    fetch();
  }, [id]);

  if (loading) {
    return (
      <div className="page-transition min-h-screen pt-28 pb-20 flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="page-transition min-h-screen pt-28 pb-20">
        <div className="container mx-auto max-w-3xl text-center py-20">
          <p className="text-muted-foreground">Notice not found.</p>
          <Link to="/notices" className="btn-primary mt-4 inline-block">Back to Notices</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto max-w-3xl">
        <Link to="/notices" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Notices
        </Link>

        <div className="feature-card p-8">
          <div className="flex items-center gap-3 mb-4">
            {notice.priority === 'High' && <AlertCircle className="w-5 h-5 text-destructive" />}
            <span className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">{notice.category}</span>
          </div>

          <h1 className="font-grotesk font-bold text-2xl mb-4">{notice.title}</h1>

          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {notice.date}</span>
            <span className="flex items-center gap-1"><Tag className="w-4 h-4" /> {notice.priority || 'Normal'} Priority</span>
          </div>

          <div className="prose prose-sm max-w-none text-foreground">
            <p>{notice.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
