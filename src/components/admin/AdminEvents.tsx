import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { eventService, CampusEvent } from '../../services/eventService';
import { useToast } from '@/hooks/use-toast';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function AdminEvents() {
    const [events, setEvents] = useState<CampusEvent[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', description: '', category: 'Technical', date: '', location: '', organizer: '' });
    const { toast } = useToast();

    useEffect(() => {
        let mounted = true;
        const unsubscribe = eventService.subscribeToEvents((data) => {
            if (mounted) { setEvents(data); setLoading(false); }
        });
        return () => { mounted = false; unsubscribe(); };
    }, []);

    const handleSave = async () => {
        if (!form.title || !form.date) return toast({ title: 'Validation Error', description: 'Title and date required', variant: 'destructive' });
        try {
            const { addDoc, serverTimestamp } = require('firebase/firestore');
            await addDoc(collection(db, 'events'), { ...form, createdAt: serverTimestamp(), images: [], coverImage: '' });
            toast({ title: 'Event Added' });
            setShowForm(false);
            setForm({ title: '', description: '', category: 'Technical', date: '', location: '', organizer: '' });
        } catch {
            toast({ title: 'Error', variant: 'destructive' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'events', id));
            toast({ title: 'Event Deleted' });
        } catch {
            toast({ title: 'Error deleting event', variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Events Management</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Event</button>
            </div>

            {showForm && (
                <div className="feature-card p-6">
                    <h3 className="font-semibold mb-4">New Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Event Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <input type="text" placeholder="Date (e.g. March 15th, 2026)" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm">
                            {['Technical', 'Cultural', 'Sports', 'Seminar', 'Networking', 'Competition'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input placeholder="Location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <input placeholder="Organizer" value={form.organizer} onChange={e => setForm({ ...form, organizer: e.target.value })} className="md:col-span-2 px-3 py-2 rounded-xl bg-muted border text-sm" />
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
                            {events.map(e => (
                                <tr key={e.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="px-4 py-3">{e.title}</td><td className="px-4 py-3">{e.category}</td><td className="px-4 py-3">{e.date}</td>
                                    <td className="px-4 py-3"><button onClick={() => handleDelete(e.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}
