import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import ScrollToTop from './components/ScrollToTop';
import RoleProtectedRoute from './components/auth/RoleProtectedRoute';

const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const StudentDashboard = lazy(() => import('./pages/StudentDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const FacultyListPage = lazy(() => import('./components/faculty/FacultyList'));
const FacultyProfilePage = lazy(() => import('./components/faculty/FacultyProfile'));
const HostelTransportPage = lazy(() => import('./components/hostel/HostelTransport'));
const Internships = lazy(() => import('./pages/Internships'));
const ResumeBuilder = lazy(() => import('./components/resume/ResumeBuilder'));
const InsightsDashboard = lazy(() => import('./components/insights/InsightsDashboard'));
const PlacementPrediction = lazy(() => import('./components/prediction/PlacementPrediction'));
const SkillGapAnalysis = lazy(() => import('./components/skillgap/SkillGapAnalysis'));
const CareerRoadmap = lazy(() => import('./components/career/CareerRoadmap'));
const PlacementReadinessScore = lazy(() => import('./components/placement-readiness/PlacementReadinessScore'));
const TransportTracker = lazy(() => import('./components/transport/TransportTracker'));
const FacultyDashboard = lazy(() => import('./pages/FacultyDashboard'));
const NoticesPage = lazy(() => import('./pages/NoticesPage'));
const NoticeDetailPage = lazy(() => import('./pages/NoticeDetailPage'));
const MapPage = lazy(() => import('./pages/MapPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Nested layouts
const AcademicsLayout = lazy(() => import('./pages/academics/AcademicsLayout'));
const DepartmentsPage = lazy(() => import('./pages/academics/DepartmentsPage'));
const FacultyPage = lazy(() => import('./pages/academics/FacultyPage'));
const SDCPage = lazy(() => import('./pages/academics/SDCPage'));
const ResearchPage = lazy(() => import('./pages/academics/ResearchPage'));
const LibraryPage = lazy(() => import('./pages/academics/LibraryPage'));

const AdmissionLayout = lazy(() => import('./pages/admission/AdmissionLayout'));
const ApplyPage = lazy(() => import('./pages/admission/ApplyPage'));
const FeesPage = lazy(() => import('./pages/admission/FeesPage'));
const ScholarshipsPage = lazy(() => import('./pages/admission/ScholarshipsPage'));
const FaqsPage = lazy(() => import('./pages/admission/FaqsPage'));

const CampusLayout = lazy(() => import('./pages/campus/CampusLayout'));
const GalleryPage = lazy(() => import('./pages/campus/GalleryPage'));
const PlacementsPage = lazy(() => import('./pages/campus/PlacementsPage'));
const SportsPage = lazy(() => import('./pages/campus/SportsPage'));
const EventsPage = lazy(() => import('./pages/campus/EventsPage'));

const queryClient = new QueryClient();

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-primary animate-pulse-glow flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground">Loading Ecosystem...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Suspense fallback={<PageLoader />}><Login /></Suspense>} />
      <Route path="/signup" element={<Suspense fallback={<PageLoader />}><Signup /></Suspense>} />
      <Route path="/*" element={<MainLayout />} />
    </Routes>
  );
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* Academics nested */}
            <Route path="/academics" element={<AcademicsLayout />}>
              <Route index element={<DepartmentsPage />} />
              <Route path="sdc" element={<SDCPage />} />
              <Route path="faculty" element={<FacultyPage />} />
              <Route path="research" element={<ResearchPage />} />
              <Route path="library" element={<LibraryPage />} />
            </Route>

            {/* Admission nested */}
            <Route path="/admission" element={<AdmissionLayout />}>
              <Route index element={<ApplyPage />} />
              <Route path="fees" element={<FeesPage />} />
              <Route path="scholarships" element={<ScholarshipsPage />} />
              <Route path="faqs" element={<FaqsPage />} />
            </Route>
            <Route path="/admissions" element={<Navigate to="/admission" replace />} />

            {/* Campus nested */}
            <Route path="/campus" element={<CampusLayout />}>
              <Route index element={<Navigate to="/campus/gallery" replace />} />
              <Route path="gallery" element={<GalleryPage />} />
              <Route path="placements" element={<PlacementsPage />} />
              <Route path="sports" element={<SportsPage />} />
              <Route path="events" element={<EventsPage />} />
            </Route>

            {/* Legacy redirects */}
            <Route path="/placements" element={<Navigate to="/campus/placements" replace />} />
            <Route path="/gallery" element={<Navigate to="/campus/gallery" replace />} />

            {/* Notices */}
            <Route path="/notices" element={<NoticesPage />} />
            <Route path="/notice/:id" element={<NoticeDetailPage />} />

            {/* Map */}
            <Route path="/map" element={<MapPage />} />

            <Route path="/contact" element={<Contact />} />
            <Route path="/faculty" element={<FacultyListPage />} />
            <Route path="/faculty/:id" element={<FacultyProfilePage />} />
            <Route path="/hostel-transport" element={<HostelTransportPage />} />
            <Route path="/internships" element={<Internships />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/insights" element={<InsightsDashboard />} />
            <Route path="/placement-prediction" element={<PlacementPrediction />} />
            <Route path="/skill-gap" element={<SkillGapAnalysis />} />
            <Route path="/career-roadmap" element={<CareerRoadmap />} />
            <Route path="/placement-readiness" element={<PlacementReadinessScore />} />
            <Route path="/transport-tracker" element={<TransportTracker />} />
            
            {/* Admin route */}
            <Route path="/admin" element={<Navigate to="/admin-dashboard" replace />} />

            {/* Protected Routes */}
            <Route
              path="/student-dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['Student', 'Admin']}>
                  <StudentDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/admin-dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route
              path="/faculty-dashboard"
              element={
                <RoleProtectedRoute allowedRoles={['Faculty', 'Admin']}>
                  <FacultyDashboard />
                </RoleProtectedRoute>
              }
            />
            <Route path="/faculty/dashboard" element={<Navigate to="/faculty-dashboard" replace />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
