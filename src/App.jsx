import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';

// Core Navigation & Layout Components (eagerly loaded)
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import LuxurySkeletonLoader from './components/LuxurySkeletonLoader';

// Global Modals & Notifications
import QuickViewModal from './components/QuickViewModal';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import LiveCameraTryOnModal from './components/LiveCameraTryOnModal';
import AiDailyTrendGif from './components/AiDailyTrendGif';
import VirtualTryOnDock from './components/VirtualTryOnDock';
import InteractiveCustomizerModal from './components/InteractiveCustomizerModal';
import CartDrawer from './components/CartDrawer';
import SearchModal from './components/SearchModal';
import ToastNotification from './components/ToastNotification';

// Route Lazy-Loading with Modern React code-splitting
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const FaceFinder = lazy(() => import('./pages/FaceFinder'));
const VirtualTryOnPage = lazy(() => import('./pages/VirtualTryOnPage'));
const EyeCare = lazy(() => import('./pages/EyeCare'));
const BookAppointment = lazy(() => import('./pages/BookAppointment'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
const Checkout = lazy(() => import('./pages/Checkout'));
const About = lazy(() => import('./pages/About'));

import ErrorBoundary from './components/ErrorBoundary';

function GlobalModalsContainer() {
  const { isAiTrendModalOpen, closeAiTrendModal } = useShop();

  return (
    <>
      <QuickViewModal />
      <VirtualTryOnModal />
      <LiveCameraTryOnModal />
      <AiDailyTrendGif isOpen={isAiTrendModalOpen} onClose={closeAiTrendModal} />
      <VirtualTryOnDock />
      <InteractiveCustomizerModal />
      <CartDrawer />
      <SearchModal />
      <ToastNotification />
    </>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ShopProvider>
        <Router>
          {/* Instant Scroll Restoration on Every Route Transition */}
          <ScrollToTop />

          <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] selection:bg-[#0284C7] selection:text-white">
            {/* Global Sticky Navigation */}
            <Navbar />

            {/* Main Route Content wrapped in Suspense with Luxury Shimmer Skeleton */}
            <main className="flex-grow">
              <Suspense fallback={<LuxurySkeletonLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/face-finder" element={<FaceFinder />} />
                  <Route path="/virtual-try-on" element={<VirtualTryOnPage />} />
                  <Route path="/try-on" element={<VirtualTryOnPage />} />
                  <Route path="/tryon" element={<VirtualTryOnPage />} />
                  <Route path="/ar" element={<VirtualTryOnPage />} />
                  <Route path="/ar-studio" element={<VirtualTryOnPage />} />
                  <Route path="/eye-care" element={<EyeCare />} />
                  <Route path="/book-appointment" element={<BookAppointment />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/about" element={<About />} />
                </Routes>
              </Suspense>
            </main>

            {/* Global Luxury Footer */}
            <Footer />

            {/* Interactive Global Modals & Portals */}
            <GlobalModalsContainer />
          </div>
        </Router>
      </ShopProvider>
    </ErrorBoundary>
  );
}

export default App;
