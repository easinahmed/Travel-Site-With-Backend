/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import DestinationsGrid from './components/DestinationsGrid';
import PackagesList from './components/PackagesList';
import HajjUmrah from './components/HajjUmrah';
import VisaServices from './components/VisaServices';
import TopAirlines from './components/TopAirlines';
import GallerySection from './components/GallerySection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import AdminDashboard from './components/AdminDashboard';

import { Booking, VisaConsultation } from './types';
import { fetchSiteContent, saveSiteContent } from './lib/contentApi';
import { loginAdmin } from './lib/authApi';
import { createBooking as submitBookingToBackend } from './lib/bookingApi';
import { createConsultation as submitConsultationToBackend } from './lib/consultationApi';
import { Lock, Eye, EyeOff, ShieldAlert, ArrowLeft, RefreshCw } from 'lucide-react';

export default function App() {
  const [view, setView] = useState<'home' | 'admin'>(() => {
    return localStorage.getItem('tr_travel_admin_token') ? 'admin' : 'home';
  });
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDestination, setSelectedDestination] = useState('');
  const [siteContent, setSiteContent] = useState<any>(null);

  // Authentication states
  const [adminToken, setAdminToken] = useState<string>(() => {
    return localStorage.getItem('tr_travel_admin_token') || '';
  });
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Booking modal state controllers
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPackageName, setBookingPackageName] = useState<string | undefined>(undefined);
  const [bookingPackageType, setBookingPackageType] = useState<'tour' | 'hajj' | 'umrah' | 'visa' | 'custom' | undefined>(undefined);
  const [bookingPrice, setBookingPrice] = useState<number | undefined>(undefined);

  // Local visual tracking logs (mirrors what the user submitted)
  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('tr_travel_bookings');
    return saved ? JSON.parse(saved) : [];
  });

  const [visaConsultations, setVisaConsultations] = useState<VisaConsultation[]>(() => {
    const saved = localStorage.getItem('tr_travel_visa_chats');
    return saved ? JSON.parse(saved) : [];
  });

  // Load Content on startup
  useEffect(() => {
    const loadContent = async () => {
      const content = await fetchSiteContent();
      if (content) {
        setSiteContent(content);
      }
    };

    loadContent();
  }, []);

  // Save list state logs locally for immediate verification feedback loops
  useEffect(() => {
    localStorage.setItem('tr_travel_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('tr_travel_visa_chats', JSON.stringify(visaConsultations));
  }, [visaConsultations]);

  // Scroll spy to switch active navigation element
  useEffect(() => {
    if (view !== 'home') return;
    const handleScroll = () => {
      const sections = ['home', 'packages', 'destinations', 'hajj-umrah', 'visa-services', 'about-us', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [view]);

  const handleNavigate = (sectionId: string) => {
    if (view !== 'home') setView('home');
    setTimeout(() => {
      const targetElement = document.getElementById(sectionId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        setActiveSection(sectionId);
      }
    }, 100);
  };

  // Triggers booking popup
  const handleOpenBooking = (
    packageName?: string,
    pType?: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom',
    basePrice?: number
  ) => {
    setBookingPackageName(packageName);
    setBookingPackageType(pType);
    setBookingPrice(basePrice);
    setIsBookingOpen(true);
  };

  // Submit booking to backend Mongoose
  const handleAddBooking = async (newBooking: Booking) => {
    try {
      const savedBooking = await submitBookingToBackend(newBooking);
      setBookings((prev) => [savedBooking, ...prev]);
    } catch (err) {
      console.warn('Backend unavailable, falling back to local simulation logs:', err);
      setBookings((prev) => [newBooking, ...prev]);
    }
  };

  // Submit visa consultation to backend Mongoose
  const handleAddVisaConsultation = async (consultData: Omit<VisaConsultation, 'id' | 'createdAt' | 'status'>) => {
    const id = `TRV-${Math.floor(1000 + Math.random() * 9000)}`;
    const createdAtDate = new Date().toLocaleDateString('en-US');
    const newConsult = {
      ...consultData,
      id,
      createdAtDate
    };

    try {
      const savedConsult = await submitConsultationToBackend(newConsult);
      const mapped: VisaConsultation = {
        id: savedConsult.id,
        name: savedConsult.name,
        email: savedConsult.email,
        phone: savedConsult.phone,
        country: savedConsult.country,
        date: savedConsult.date,
        timeSlot: savedConsult.timeSlot,
        notes: savedConsult.notes,
        status: savedConsult.status,
        createdAt: savedConsult.createdAtDate
      };
      setVisaConsultations((prev) => [mapped, ...prev]);
    } catch (err) {
      console.warn('Backend unavailable, falling back to local simulation logs:', err);
      const fallbackConsult: VisaConsultation = {
        ...consultData,
        id,
        createdAt: createdAtDate,
        status: 'Scheduled'
      };
      setVisaConsultations((prev) => [fallbackConsult, ...prev]);
    }
  };

  // Called when search button on flight widget is clicked
  const handleSearchAction = (searchParams: { destination: string; type: string }) => {
    if (searchParams.destination) {
      setSelectedDestination(searchParams.destination);
    }
  };

  // Admin login handler
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await loginAdmin(loginEmail, loginPassword);
      if (res.token) {
        setAdminToken(res.token);
        localStorage.setItem('tr_travel_admin_token', res.token);
        setLoginEmail('');
        setLoginPassword('');
      } else {
        setLoginError('Invalid response from server authentication.');
      }
    } catch (err: any) {
      setLoginError(err.message || 'Verification failed. Double check coordinates.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Save content from dashboard
  const handleSaveContent = async (updatedContent: any) => {
    const result = await saveSiteContent(updatedContent, adminToken);
    if (result) {
      setSiteContent(result);
      return true;
    }
    return false;
  };

  // Admin logout handler
  const handleAdminLogout = () => {
    setAdminToken('');
    localStorage.removeItem('tr_travel_admin_token');
    setView('home');
  };

  // Render Admin View (Login or Dashboard)
  if (view === 'admin') {
    if (adminToken) {
      return (
        <AdminDashboard
          siteContent={siteContent}
          onSaveContent={handleSaveContent}
          onLogout={handleAdminLogout}
          token={adminToken}
        />
      );
    }

    return (
      <div className="min-h-screen bg-zinc-950 text-gray-100 flex items-center justify-center p-4 font-sans selection:bg-accent selection:text-white">
        
        {/* Glass Card Container */}
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-6 sm:p-10 max-w-md w-full relative shadow-2xl overflow-hidden">
          
          {/* Top layout icons */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-800">
            <button 
              onClick={() => setView('home')} 
              className="p-2 hover:bg-zinc-800 text-gray-400 hover:text-white rounded-lg transition-colors flex items-center space-x-1.5 text-xs font-bold uppercase cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
            <span className="text-[10px] text-accent font-bold uppercase tracking-widest">TR Portal Secure</span>
          </div>

          <div className="text-center space-y-2 mb-8">
            <div className="bg-accent/10 border border-accent/20 w-12 h-12 rounded-2xl flex items-center justify-center mx-auto text-accent shadow-sm">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-white">Administrator Sign In</h2>
            <p className="text-xs text-gray-400">Unlock travel configuration panel and client registers.</p>
          </div>

          {/* Form */}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">Authority Email</label>
              <input
                type="email"
                required
                placeholder="admin@trtravel.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3.5 text-xs focus:outline-none focus:border-accent"
              />
            </div>

            <div>
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">Security Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 text-white rounded-xl p-3.5 pr-10 text-xs focus:outline-none focus:border-accent"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-gray-500 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/50 border border-red-900/30 text-red-400 text-[11px] rounded-xl flex items-center space-x-2 animate-shake">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 bg-accent hover:bg-accent-dark disabled:bg-zinc-800 text-zinc-950 disabled:text-gray-400 font-sans font-bold text-xs tracking-widest uppercase rounded-xl transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center space-x-2"
            >
              {isLoggingIn ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
                  <span>Validating Key...</span>
                </>
              ) : (
                <span>Access Console</span>
              )}
            </button>
          </form>

          {/* Hint info */}
          <div className="mt-8 text-center text-[10px] text-zinc-500 bg-zinc-950/50 p-3 rounded-xl border border-zinc-850">
            💡 Default Seeding: <strong>admin@trtravel.com</strong> / <strong>admin1234</strong>
          </div>

        </div>
      </div>
    );
  }

  // Regular Visitor View
  return (
    <div className="bg-primary selection:bg-accent selection:text-white min-h-screen text-dark font-sans relative antialiased">
      
      {/* Floating Header */}
      <Navbar
        onOpenBooking={(pName, pType) => handleOpenBooking(pName, pType, pType === 'hajj' ? 6500 : pType === 'umrah' ? 1950 : 1250)}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        content={siteContent?.navbar}
      />

      {/* Main Structural Blocks */}
      <main>
        
        {/* Cinematic Hero Header with flight search */}
        <Hero 
          onSearch={handleSearchAction} 
          onOpenBooking={(pName, pType) => handleOpenBooking(pName, pType, 500)}
          content={siteContent?.hero}
        />
        
        {/* Core highlight value cards */}
        <Features content={siteContent?.features} />
        
        {/* Selected Destinations Matrix in grid */}
        <DestinationsGrid
          onSelectDestination={setSelectedDestination}
          selectedDestination={selectedDestination}
          content={siteContent?.destinations}
        />
        
        {/* Filterable, query-searchable travel packages list */}
        <PackagesList
          onOpenBooking={handleOpenBooking}
          selectedDestination={selectedDestination}
          onSelectDestination={setSelectedDestination}
          content={siteContent?.packages}
        />
        
        {/* Holy Pilgrimage Hajj & Umrah focused comparison packages */}
        <HajjUmrah onOpenBooking={handleOpenBooking} content={siteContent?.hajjPackages} />
        
        {/* Integrated Embassy Visa Requirements and consultancy appointments */}
        <VisaServices
          onAddVisaConsultation={handleAddVisaConsultation}
          visaConsultations={visaConsultations}
          content={siteContent?.visas}
        />
        
        {/* Search Top Airlines section listing all flight partner networks */}
        <TopAirlines content={siteContent?.airlines} />
        
        {/* Masonry-style captured travel memories photography with Lightbox */}
        <GallerySection content={siteContent?.gallery} />
        
        {/* Corporate heritage overview, MD statements, missionvision tabs, and team */}
        <AboutSection content={siteContent?.about} />
        
        {/* Interactive inbox submission message form & simulated Google Map */}
        <ContactSection content={siteContent?.contact} />

      </main>

      {/* Detailed dark-theme navigation footer links and newsletters */}
      <Footer 
        onNavigate={handleNavigate} 
        content={siteContent?.footer} 
        onAdminClick={() => setView('admin')}
      />

      {/* Multi-step Secure Booking Checkout wizard popup */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        packageName={bookingPackageName}
        packageType={bookingPackageType}
        basePrice={bookingPrice}
        onAddBooking={handleAddBooking}
      />

      {/* Persistent floating indicator button representing active booking history logs */}
      {bookings.length > 0 && (
        <div className="fixed bottom-6 right-6 z-40 bg-zinc-950 text-white rounded-2xl border border-zinc-800 shadow-2xl p-4 max-w-xs animate-slide-up">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] text-accent font-bold uppercase tracking-wider block">🎉 ACTIVE TICKET LISTING ({bookings.length})</span>
            <button 
              onClick={() => {
                if (confirm('Clear current booking logs history?')) {
                  setBookings([]);
                  localStorage.removeItem('tr_travel_bookings');
                }
              }} 
              className="text-[9px] text-gray-500 hover:text-white cursor-pointer"
            >
              Clear Logs
            </button>
          </div>
          <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
            {bookings.map((b) => (
              <div key={b.id} className="text-[10px] leading-snug border-b border-zinc-800 pb-1.5 last:border-0 last:pb-0">
                <div className="font-bold text-accent truncate">{b.packageName}</div>
                <div className="text-gray-400 flex justify-between">
                  <span>Ref: {b.id} ({b.travelersCount} seat)</span>
                  <span className="text-emerald-400 text-[9px] font-bold">Confirmed</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
