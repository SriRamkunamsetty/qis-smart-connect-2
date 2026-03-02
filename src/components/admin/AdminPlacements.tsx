import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { placementService, PlacementRecord } from '../../services/placementService';
import { useToast } from '@/hooks/use-toast';
import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function AdminPlacements() {
    const [placements, setPlacements] = useState<PlacementRecord[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ studentName: '', branch: 'CSE', company: '', package: '', year: '2025', role: '' });
    const { toast } = useToast();

    useEffect(() => {
        let mounted = true;
        const unsubscribe = placementService.subscribeToPlacements((data) => {
            if (mounted) { setPlacements(data); setLoading(false); }
        });
        return () => { mounted = false; unsubscribe(); };
    }, []);

    const handleSave = async () => {
        if (!form.studentName || !form.company || !form.package) return toast({ title: 'Validation Error', description: 'Student, company, and package required', variant: 'destructive' });
        try {
            const { addDoc, serverTimestamp } = require('firebase/firestore');
            await addDoc(collection(db, 'placements'), { ...form, createdAt: serverTimestamp() });
            toast({ title: 'Placement Added' });
            setShowForm(false);
            setForm({ studentName: '', branch: 'CSE', company: '', package: '', year: '2025', role: '' });
        } catch {
            toast({ title: 'Error', variant: 'destructive' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'placements', id));
            toast({ title: 'Placement Deleted' });
        } catch {
            toast({ title: 'Error deleting placement', variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Placements Management</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Placement</button>
            </div>

            {showForm && (
                <div className="feature-card p-6">
                    <h3 className="font-semibold mb-4">New Placement Record</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input placeholder="Student Name" value={form.studentName} onChange={e => setForm({ ...form, studentName: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <select value={form.branch} onChange={e => setForm({ ...form, branch: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm">
                            {['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT', 'AI&ML'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input placeholder="Company (e.g. Google)" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <input placeholder="Package (e.g. 42 LPA)" value={form.package} onChange={e => setForm({ ...form, package: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <input type="text" placeholder="Year" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <input placeholder="Role (e.g. Software Engineer)" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
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
                        <thead className="bg-muted/50"><tr><th className="px-4 py-3 text-left">Student</th><th className="px-4 py-3 text-left">Branch</th><th className="px-4 py-3 text-left">Company</th><th className="px-4 py-3 text-left">Package</th><th className="px-4 py-3 text-left">Actions</th></tr></thead>
                        <tbody>
                            {placements.map(p => (
                                <tr key={p.id} className="border-b last:border-0 hover:bg-muted/30">
                                    <td className="px-4 py-3 font-medium">{p.studentName}</td><td className="px-4 py-3">{p.branch}</td><td className="px-4 py-3 font-semibold">{p.company}</td><td className="px-4 py-3 text-green-600 font-medium">{p.package}</td>
                                    <td className="px-4 py-3"><button onClick={() => handleDelete(p.id)} className="p-1.5 text-destructive hover:bg-destructive/10 rounded"><Trash2 className="w-4 h-4" /></button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}
