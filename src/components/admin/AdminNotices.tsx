import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { noticeService, Notice } from '../../services/noticeService';
import { useToast } from '@/hooks/use-toast';

export default function AdminNotices() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);

    type CategoryType = 'General' | 'Academic' | 'Placement' | 'Sports' | 'Exam' | 'Event';
    type PriorityType = 'High' | 'Medium' | 'Low';

    const [form, setForm] = useState({ title: '', description: '', category: 'General' as CategoryType, priority: 'Medium' as PriorityType, date: new Date().toISOString().split('T')[0] });
    const { toast } = useToast();

    useEffect(() => {
        let mounted = true;
        const unsubscribe = noticeService.subscribeToNotices((data) => {
            if (mounted) {
                setNotices(data);
                setLoading(false);
            }
        });
        return () => { mounted = false; unsubscribe(); };
    }, []);

    const handleSave = async () => {
        if (!form.title || !form.description) return toast({ title: 'Validation Error', description: 'Title and description required', variant: 'destructive' });
        try {
            await noticeService.createNotice(form);
            toast({ title: 'Notice Added' });
            setShowForm(false);
            setForm({ title: '', description: '', category: 'General' as CategoryType, priority: 'Medium' as PriorityType, date: new Date().toISOString().split('T')[0] });
        } catch {
            toast({ title: 'Error', variant: 'destructive' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await noticeService.deleteNotice(id);
            toast({ title: 'Notice Deleted' });
        } catch {
            toast({ title: 'Error deleting notice', variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Notices Management</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Notice</button>
            </div>

            {showForm && (
                <div className="feature-card p-6">
                    <h3 className="font-semibold mb-4">New Notice</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value as CategoryType })} className="px-3 py-2 rounded-xl bg-muted border text-sm">
                            {['Academic', 'Placement', 'Sports', 'Exam', 'Event', 'General'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value as PriorityType })} className="px-3 py-2 rounded-xl bg-muted border text-sm">
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="md:col-span-2 px-3 py-2 rounded-xl bg-muted border text-sm" rows={3}></textarea>
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleSave} className="btn-primary text-sm">Save</button>
                        <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
                    </div>
                </div>
            )}

            <div className="feature-card overflow-hidden">
                {loading ? <div className="p-8 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div> :
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50"><tr><th className="px-4 py-3 text-left">Title</th><th className="px-4 py-3 text-left">Category</th><th className="px-4 py-3 text-left">Date</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
                        <tbody>
                            {notices.map(n => (
                                <tr key={n.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="px-4 py-3">{n.title}</td><td className="px-4 py-3">{n.category}</td><td className="px-4 py-3">{n.date}</td>
                                    <td className="px-4 py-3"><button onClick={() => handleDelete(n.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}
