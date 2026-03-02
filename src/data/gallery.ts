export interface GalleryImage {
  id: number;
  src: string;
  title: string;
  category: string;
}

export const galleryImages: GalleryImage[] = [
  { id: 1, src: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80', title: 'Campus Main Building', category: 'Campus' },
  { id: 2, src: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80', title: 'Library', category: 'Facilities' },
  { id: 3, src: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80', title: 'Graduation Ceremony', category: 'Events' },
  { id: 4, src: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80', title: 'Labs', category: 'Facilities' },
  { id: 5, src: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?auto=format&fit=crop&q=80', title: 'Sports Ground', category: 'Sports' },
  { id: 6, src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80', title: 'Seminar Hall', category: 'Facilities' },
  { id: 7, src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80', title: 'TechFest 2025', category: 'Events' },
  { id: 8, src: 'https://images.unsplash.com/photo-1461896836934-bd45ba9fcbc3?auto=format&fit=crop&q=80', title: 'Annual Sports Day', category: 'Sports' },
];
