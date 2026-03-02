import { useState, useEffect } from 'react';
import { Plus, Trash2, Loader2 } from 'lucide-react';
import { galleryService, GalleryImage } from '../../services/galleryService';
import { useToast } from '@/hooks/use-toast';
import { collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function AdminGallery() {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [form, setForm] = useState({ title: '', category: 'Campus', src: '' });
    const { toast } = useToast();

    useEffect(() => {
        let mounted = true;
        const unsubscribe = galleryService.subscribeToGallery((data) => {
            if (mounted) { setImages(data); setLoading(false); }
        });
        return () => { mounted = false; unsubscribe(); };
    }, []);

    const handleSave = async () => {
        if (!form.title || !form.src) return toast({ title: 'Validation Error', description: 'Title and Source URL required', variant: 'destructive' });
        try {
            // Add logic implemented below natively or expand galleryService
            const { addDoc, serverTimestamp } = require('firebase/firestore');
            await addDoc(collection(db, 'gallery'), { ...form, createdAt: serverTimestamp() });
            toast({ title: 'Image Added' });
            setShowForm(false);
            setForm({ title: '', category: 'Campus', src: '' });
        } catch {
            toast({ title: 'Error', variant: 'destructive' });
        }
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, 'gallery', id.toString()));
            toast({ title: 'Image Deleted' });
        } catch {
            toast({ title: 'Error deleting image', variant: 'destructive' });
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between">
                <h2 className="text-xl font-bold">Gallery Management</h2>
                <button onClick={() => setShowForm(true)} className="btn-primary text-sm"><Plus className="w-4 h-4" /> Add Image</button>
            </div>

            {showForm && (
                <div className="feature-card p-6">
                    <h3 className="font-semibold mb-4">New Image Link</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input placeholder="Image Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm" />
                        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="px-3 py-2 rounded-xl bg-muted border text-sm">
                            {['Campus', 'Facilities', 'Events', 'Sports'].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <input placeholder="Source URL (https://...)" value={form.src} onChange={e => setForm({ ...form, src: e.target.value })} className="md:col-span-2 px-3 py-2 rounded-xl bg-muted border text-sm" />
                    </div>
                    <div className="flex gap-3 mt-4">
                        <button onClick={handleSave} className="btn-primary text-sm">Save</button>
                        <button onClick={() => setShowForm(false)} className="btn-outline text-sm">Cancel</button>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {loading ? <div className="col-span-full py-10 text-center text-muted-foreground"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></div> :
                    images.map(img => (
                        <div key={img.id} className="feature-card overflow-hidden group relative">
                            <img src={img.src} alt={img.title} className="w-full h-32 object-cover" />
                            <div className="p-3">
                                <p className="font-semibold text-sm truncate">{img.title}</p>
                                <p className="text-xs text-muted-foreground">{img.category}</p>
                            </div>
                            <button onClick={() => handleDelete(img.id.toString())} className="absolute top-2 right-2 p-1.5 bg-destructive text-white rounded opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
