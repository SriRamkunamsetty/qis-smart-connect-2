import Hero from '../components/Hero';
import StatsSection from '../components/StatsSection';
import PlacementSection from '../components/PlacementSection';
import GallerySection from '../components/GallerySection';
import NoticeBoard from '../components/NoticeBoard';
import MapSection from '../components/MapSection';

export default function Home() {
  return (
    <div className="page-transition">
      <Hero />
      <StatsSection />
      <PlacementSection />
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <GallerySection />
          </div>
          <div>
            <NoticeBoard />
          </div>
        </div>
      </div>
      <MapSection />
    </div>
  );
}
