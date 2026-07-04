/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Compass, Search, Calendar, Users, Briefcase, MapPin, ArrowRightLeft } from 'lucide-react';

interface HeroProps {
  onSearch: (searchParams: { destination: string; type: string }) => void;
  onOpenBooking: (packageName?: string, pType?: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom') => void;
  content?: any;
}

export default function Hero({ onSearch, onOpenBooking, content }: HeroProps) {
  const [tripType, setTripType] = useState<'round' | 'one-way'>('round');
  const [fromLoc, setFromLoc] = useState('Dhaka (DAC)');
  const [toLoc, setToLoc] = useState('Saudi Arabia (JED)');
  const [departureDate, setDepartureDate] = useState('2026-07-15');
  const [returnDate, setReturnDate] = useState('2026-07-29');
  const [travelers, setTravelers] = useState('1');
  const [cabinClass, setCabinClass] = useState('Business');

  const handleSwap = () => {
    const temp = fromLoc;
    setFromLoc(toLoc);
    setToLoc(temp);
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    // Translate destination name for the package filtering
    let searchDest = '';
    if (toLoc.toLowerCase().includes('saudi') || toLoc.toLowerCase().includes('makkah')) {
      searchDest = 'Saudi Arabia';
    } else if (toLoc.toLowerCase().includes('turkey') || toLoc.toLowerCase().includes('istanbul')) {
      searchDest = 'Turkey';
    } else if (toLoc.toLowerCase().includes('dubai') || toLoc.toLowerCase().includes('uae')) {
      searchDest = 'Dubai';
    } else if (toLoc.toLowerCase().includes('malaysia') || toLoc.toLowerCase().includes('kuala')) {
      searchDest = 'Malaysia';
    } else if (toLoc.toLowerCase().includes('thailand') || toLoc.toLowerCase().includes('bangkok')) {
      searchDest = 'Thailand';
    } else if (toLoc.toLowerCase().includes('singapore')) {
      searchDest = 'Singapore';
    } else {
      searchDest = 'Bangladesh';
    }

    onSearch({
      destination: searchDest,
      type: searchDest === 'Saudi Arabia' ? 'umrah' : 'tour'
    });

    // Scroll to packages section
    document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-dark pt-20">
      {/* Background Image Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={content?.backgroundImage || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80'}
          alt="Luxury Flight Journey"
          className="w-full h-full object-cover object-center opacity-65 scale-105 transform ease-out duration-[30s]"
        />
        <div className="absolute inset-0 hero-gradient-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-12 pb-24 text-center md:text-left flex flex-col items-center">
        
        {/* Core Slogan & Subtitle */}
        <div className="w-full text-center max-w-4xl mx-auto mb-12 animate-slide-up">
          <div className="inline-flex items-center space-x-2 bg-accent/20 border border-accent/40 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-accent text-xs font-semibold tracking-wider uppercase font-sans">
              {content?.badge || 'Award-Winning Luxury Tourism Brand 2026'}
            </span>
          </div>
          
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1] text-white">
            {content?.title || 'Explore The World With'} <span className="text-gold-gradient font-sans">TR Travel</span>
          </h1>
          
          <p className="font-sans text-base sm:text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            {content?.subtitle || 'Trusted Travel Partner for Premium Tours, Holiday Packages, Visa Assistance, and Comfort-Guaranteed Hajj & Umrah Expeditions.'}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenBooking(undefined, 'custom')}
              className="px-8 py-4 bg-accent hover:bg-accent-dark text-white rounded-xl shadow-lg transition-all duration-300 font-sans font-bold text-sm tracking-widest uppercase cursor-pointer"
            >
              {content?.primaryButton || 'Book Now'}
            </button>
            <button
              onClick={() => document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl shadow-sm transition-all duration-300 font-sans font-bold text-sm tracking-widest uppercase backdrop-blur-sm cursor-pointer"
            >
              {content?.secondaryButton || 'View Packages'}
            </button>
          </div>
        </div>

        {/* Flight-Style Search Widget */}
        <div className="w-full max-w-5xl bg-white text-dark rounded-2xl shadow-2xl p-6 md:p-8 animate-slide-up border border-gray-100 relative mt-4">
          
          {/* Trip Type Tabs */}
          <div className="flex flex-wrap items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setTripType('round')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tripType === 'round' ? 'bg-white text-dark shadow-xs' : 'text-gray-500 hover:text-dark'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('one-way')}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  tripType === 'one-way' ? 'bg-white text-dark shadow-xs' : 'text-gray-500 hover:text-dark'
                }`}
              >
                One Way
              </button>
            </div>

            <div className="flex items-center space-x-6 mt-3 md:mt-0 text-xs font-medium text-gray-500">
              <span className="flex items-center space-x-1">
                <Users className="w-3.5 h-3.5 text-accent" />
                <span>Travelers: </span>
                <select 
                  value={travelers} 
                  onChange={(e) => setTravelers(e.target.value)} 
                  className="text-dark font-semibold bg-transparent focus:outline-none ml-1 cursor-pointer"
                >
                  <option value="1">1 Adult</option>
                  <option value="2">2 Adults</option>
                  <option value="3">3 Adults</option>
                  <option value="4">4 Adults</option>
                  <option value="5">Group/Family</option>
                </select>
              </span>

              <span className="flex items-center space-x-1">
                <Briefcase className="w-3.5 h-3.5 text-accent" />
                <span>Class: </span>
                <select 
                  value={cabinClass} 
                  onChange={(e) => setCabinClass(e.target.value)} 
                  className="text-dark font-semibold bg-transparent focus:outline-none ml-1 cursor-pointer"
                >
                  <option value="Economy">Economy</option>
                  <option value="Business">Business</option>
                  <option value="First">First Class</option>
                </select>
              </span>
            </div>
          </div>

          {/* Core Fields Grid */}
          <form onSubmit={handleSearchClick} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
            
            {/* FROM LOC */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">From</label>
              <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 hover:border-gray-200 transition-colors rounded-xl p-3.5">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <select 
                  value={fromLoc} 
                  onChange={(e) => setFromLoc(e.target.value)}
                  className="w-full text-sm font-semibold bg-transparent border-none text-dark focus:outline-none cursor-pointer"
                >
                  {(content?.fromOptions || ['Dhaka (DAC)', 'Chittagong (CGP)', 'Sylhet (ZYL)']).map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* SWAP BUTTON */}
            <div className="md:col-span-1 flex justify-center md:pb-3">
              <button
                type="button"
                onClick={handleSwap}
                className="p-2.5 rounded-full hover:bg-gray-150 bg-gray-50 border border-gray-100 hover:border-accent text-dark cursor-pointer transition-all hover:scale-105 active:scale-95 shadow-sm"
                title="Swap Locations"
              >
                <ArrowRightLeft className="w-4 h-4 text-gray-500 rotate-90 md:rotate-0" />
              </button>
            </div>

            {/* TO LOC */}
            <div className="md:col-span-3 relative">
              <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">To Destination</label>
              <div className="flex items-center space-x-2 bg-gray-50 hover:bg-gray-100/70 border border-gray-100 hover:border-gray-200 transition-colors rounded-xl p-3.5">
                <MapPin className="w-4 h-4 text-accent shrink-0" />
                <select 
                  value={toLoc} 
                  onChange={(e) => setToLoc(e.target.value)}
                  className="w-full text-sm font-semibold bg-transparent border-none text-dark focus:outline-none cursor-pointer"
                >
                  {(content?.toOptions || ['Saudi Arabia (JED)', 'Turkey (IST)', 'Dubai (DXB)', 'Malaysia (KUL)', 'Thailand (BKK)', 'Singapore (SIN)', 'Bangladesh (Cox\'s Bazar)']).map((option: string) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* DEPARTURE DATE */}
            <div className="grid grid-cols-2 gap-4 md:col-span-3">
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">Depart</label>
                <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded-xl p-3.5 relative">
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <input
                    type="date"
                    value={departureDate}
                    onChange={(e) => setDepartureDate(e.target.value)}
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none text-dark cursor-pointer"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider text-gray-400 uppercase mb-2">Return</label>
                <div className="flex items-center space-x-2 bg-gray-50 border border-gray-100 rounded-xl p-3.5 relative">
                  <Calendar className="w-4 h-4 text-accent shrink-0" />
                  <input
                    type="date"
                    disabled={tripType === 'one-way'}
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full text-xs font-semibold bg-transparent focus:outline-none text-dark disabled:opacity-40 cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* ACTION BUTTON */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Search Tour</span>
              </button>
            </div>

          </form>
          
          {/* Bottom taglines */}
          <div className="mt-4 flex flex-wrap gap-4 text-[11px] font-semibold text-gray-400">
            <span className="flex items-center text-accent">● Luxury VIP Lounge Access Offered</span>
            <span>● Official Saudi E-visa Provider</span>
            <span>● 24h Assistance Support Desk</span>
          </div>

        </div>

      </div>
    </section>
  );
}
