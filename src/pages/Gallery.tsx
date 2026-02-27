import { useState } from 'react';
import { galleryImages } from '../data/dummyData';
import { X, ZoomIn } from 'lucide-react';

const categories = ['all', 'events', 'labs', 'campus'];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState<null | typeof galleryImages[0]>(null);

  const filtered = activeCategory === 'all'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="page-transition min-h-screen pt-28 pb-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h1 className="section-title mb-4">Campus <span className="gradient-text">Gallery</span></h1>
          <p className="section-subtitle">A visual journey through our vibrant campus life</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium capitalize transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-primary text-white shadow-glow'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {cat === 'all' ? '✨ All' : cat === 'events' ? '🎉 Events' : cat === 'labs' ? '🔬 Labs' : '🏫 Campus'}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {filtered.map((img, i) => (
            <div
              key={img.id}
              className="break-inside-avoid relative overflow-hidden rounded-2xl cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${i * 0.08}s` }}
              onClick={() => setLightbox(img)}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/50 transition-all duration-300 flex items-center justify-center">
                <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-50 group-hover:scale-100" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-sm font-medium">{img.title}</p>
                <p className="text-white/70 text-xs capitalize mt-0.5">{img.category}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="max-w-4xl w-full animate-scale-in" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src.replace('w=400', 'w=1200').replace('w=600', 'w=1200')}
              alt={lightbox.title}
              className="w-full rounded-2xl object-cover max-h-[80vh]"
            />
            <div className="mt-4 text-center">
              <p className="text-white font-semibold text-lg">{lightbox.title}</p>
              <p className="text-white/60 text-sm capitalize mt-1">{lightbox.category}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
