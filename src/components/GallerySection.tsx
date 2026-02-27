import { galleryImages } from '../data/dummyData';
import { Link } from 'react-router-dom';
import { ChevronRight, Camera } from 'lucide-react';

export default function GallerySection() {
  const preview = galleryImages.slice(0, 4);

  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="section-title">Campus <span className="gradient-text">Gallery</span></h2>
            <p className="text-sm text-muted-foreground mt-1">Life at QISCET</p>
          </div>
          <Link to="/gallery" className="btn-outline text-sm px-4 py-2 flex items-center gap-2">
            <Camera className="w-4 h-4" />
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {preview.map((img, i) => (
            <Link
              to="/gallery"
              key={img.id}
              className="relative overflow-hidden rounded-2xl group aspect-square"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <img
                src={img.src}
                alt={img.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/40 transition-all duration-300 flex items-end p-3">
                <p className="text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                  {img.title}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
