/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, ShieldAlert, Train, Compass, CheckCircle2, Award, Calendar, ChevronRight } from 'lucide-react';
import { HAJJ_UMRAH_PACKAGES } from '../data/travelData';
import { HajjUmrahPackage } from '../types';

interface HajjUmrahProps {
  onOpenBooking: (packageName: string, pType: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom', basePrice: number) => void;
  content?: any[];
}

export default function HajjUmrah({ onOpenBooking, content }: HajjUmrahProps) {
  const [activeTab, setActiveTab] = useState<'Umrah' | 'Hajj'>('Umrah');
  const [selectedPkg, setSelectedPkg] = useState<HajjUmrahPackage | null>(null);

  const filteredPackages = (content?.length ? content : HAJJ_UMRAH_PACKAGES).filter((pkg: any) => pkg.category === activeTab);

  return (
    <section id="hajj-umrah" className="py-24 bg-dark text-white relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute right-0 top-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] z-0 pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-96 h-96 bg-accent/5 rounded-full blur-[100px] z-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1.5 bg-accent/15 border border-accent/25 rounded-md px-3.5 py-1 mb-4">
            <Award className="w-3.5 h-3.5 text-accent" />
            <span className="text-accent text-xs font-semibold tracking-widest uppercase font-sans">Ministry of Religious Affairs Approved</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Premium Hajj & Umrah Pilgrimages
          </h2>
          <p className="font-sans text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Spiritual journeys planned with extreme care. Stay in handpicked 5-star hotels directly facing the holy Masjids, guided by honored Islamic scholars.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 rounded"></div>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-16">
          <div className="bg-white/5 border border-white/10 p-1.5 rounded-xl inline-flex space-x-2">
            <button
              onClick={() => setActiveTab('Umrah')}
              className={`px-8 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'Umrah' 
                  ? 'bg-accent text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Umrah Packages 2026/27
            </button>
            <button
              onClick={() => setActiveTab('Hajj')}
              className={`px-8 py-3 rounded-lg text-xs font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                activeTab === 'Hajj' 
                  ? 'bg-accent text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              Hajj Packages 1448 AH
            </button>
          </div>
        </div>

        {/* Packages Cards Grid with Comparisons */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between hover:border-accent/40 hover:shadow-[0_4px_30px_rgba(212,175,55,0.06)] transition-all duration-300 group relative"
            >
              {pkg.tier === 'Luxury' && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-[9px] font-bold tracking-widest uppercase px-4 py-1 rounded-full shadow-md whitespace-nowrap border border-white/20">
                  🔱 Royal Elite Choice
                </div>
              )}

              <div>
                {/* Header Information */}
                <div className="pb-6 border-b border-zinc-800">
                  <div className="text-xs font-bold text-accent tracking-wider uppercase mb-1">{pkg.tier} Suite Package</div>
                  <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-gold-gradient transition-all">{pkg.name}</h3>
                  <div className="text-xs text-gray-400">{pkg.duration} Complete Pilgrim Stay</div>
                  
                  {/* Price display */}
                  <div className="mt-4 flex items-baseline">
                    <span className="text-xs text-gray-400 mr-2">Starting at</span>
                    <span className="text-3xl font-sans font-bold text-white">${pkg.price}</span>
                    <span className="text-xs text-gray-500 font-medium ml-1">/ person</span>
                  </div>
                </div>

                {/* Key pilgrim comparisons: Hotels, Distance, transport */}
                <div className="py-6 space-y-4 text-xs font-sans border-b border-zinc-800">
                  
                  {/* Makkah Accom */}
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block mb-1">Makkah Hotel Address:</span>
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{pkg.makkahHotel}</span>
                      <span className="flex space-x-0.5 ml-2">
                        {Array.from({ length: pkg.makkahHotelRating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                        ))}
                      </span>
                    </div>
                  </div>

                  {/* Madinah Accom */}
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block mb-1">Madinah Hotel Address:</span>
                    <div className="font-semibold text-white flex items-center justify-between">
                      <span>{pkg.madinahHotel}</span>
                      <span className="flex space-x-0.5 ml-2">
                        {Array.from({ length: pkg.madinahHotelRating }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-accent text-accent" />
                        ))}
                      </span>
                    </div>
                  </div>

                  {/* Haram Distance */}
                  <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800/60">
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block mb-1">🚶 Walking Steps to Al Haram:</span>
                    <div className="font-bold text-accent">{pkg.distanceToHaram}</div>
                  </div>

                  {/* Transportation */}
                  <div>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-wide block mb-1">🚍 Local Transportation Class:</span>
                    <div className="font-semibold text-gray-300">{pkg.transportation}</div>
                  </div>
                </div>

                {/* Pilgrimage Inclusions */}
                <div className="pt-6 space-y-2.5">
                  <span className="block text-[10px] text-gray-500 font-bold uppercase tracking-wide mb-2">Pilgim Package Inclusions:</span>
                  {pkg.inclusions.slice(0, 4).map((inc, index) => (
                    <div key={index} className="flex items-start text-xs text-gray-300 font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mr-2 mt-0.5 shrink-0" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>

                {/* Registration terms */}
                <div className="mt-6 flex items-center bg-accent/5 p-3 rounded-lg border border-accent/10">
                  <Calendar className="w-4 h-4 text-accent mr-2 shrink-0" />
                  <span className="text-[10px] text-gray-300 uppercase tracking-wider font-semibold">
                    REGISTRATION DEADLINE: <strong className="text-white">{pkg.registrationDeadline}</strong>
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 grid grid-cols-2 gap-3 pt-4">
                <button
                  onClick={() => setSelectedPkg(pkg)}
                  className="py-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-sans font-bold text-[11px] tracking-wider uppercase rounded-xl transition-all cursor-pointer"
                >
                  View Itinerary
                </button>
                <button
                  onClick={() => onOpenBooking(pkg.name, activeTab === 'Hajj' ? 'hajj' : 'umrah', pkg.price)}
                  className="py-3 bg-accent hover:bg-accent-dark text-white font-sans font-bold text-[11px] tracking-wider uppercase rounded-xl transition-all hover:shadow-lg cursor-pointer"
                >
                  Book Seat
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Dynamic support disclaimer section */}
        <div className="mt-16 bg-zinc-900/50 border border-zinc-800 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-accent/20 rounded-xl text-accent shrink-0">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h4 className="font-sans font-bold text-base text-white mb-1">Pre-departure Pilgrim Seminars & Kits</h4>
              <p className="font-sans text-xs text-gray-400 leading-relaxed max-w-2xl">
                We organize comprehensive pre-travel seminars with experienced scholars to educate pilgrims on precise ritual frameworks and safety directives. Standard packages also include premium quality Ihrams, travel suitcases, and a permanent dedicated coordinator batch accompanying you from Dhaka Airport.
              </p>
            </div>
          </div>
          
          <button
            onClick={() => {
              const contactSec = document.getElementById('contact');
              if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3.5 bg-white text-dark font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-md shrink-0 hover:bg-accent hover:text-white transition-all cursor-pointer"
          >
            Ask Scholar Call
          </button>
        </div>

      </div>

      {/* DETAILED HAJJ/UMRAH ITINERARY DIALOG */}
      {selectedPkg && (
        <div className="fixed inset-0 bg-dark/85 backdrop-blur-sm z-50 flex items-center justify-center p-4 text-dark">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-gray-150">
            
            {/* Header Dialog */}
            <div className="p-6 sm:p-8 bg-zinc-900 text-white relative">
              <button
                onClick={() => setSelectedPkg(null)}
                className="absolute top-4 right-4 bg-white/10 hover:bg-white text-white hover:text-dark p-1.5 rounded-full cursor-pointer transition-all"
              >
                ×
              </button>
              <span className="text-accent text-[10px] font-bold tracking-widest uppercase block mb-1">
                {selectedPkg.category} / {selectedPkg.tier} Details
              </span>
              <h4 className="font-display font-medium text-2xl text-white">{selectedPkg.name}</h4>
              <p className="text-xs text-gray-300 mt-1">{selectedPkg.duration}</p>
            </div>

            {/* Inner Content */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <div>
                <h5 className="font-sans font-bold text-sm text-dark mb-3 uppercase tracking-wider border-b pb-1">Sacred Itinerary Timeline</h5>
                <div className="space-y-4">
                  {selectedPkg.itinerary.map((step, idx) => (
                    <div key={idx} className="flex items-start space-x-3 text-xs">
                      <span className="bg-accent/15 text-accent font-semibold px-2 py-0.5 rounded text-[10px] shrink-0 mt-0.5">
                        Day {idx + 1}
                      </span>
                      <p className="text-text-light leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h5 className="font-sans font-bold text-sm text-dark mb-2.5 uppercase tracking-wider border-b pb-1">Exclusive Value Features</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedPkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start text-xs text-text-light font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5 mt-0.5 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package summary info boxes */}
              <div className="bg-secondary p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-500">Makkah Hotel:</span>
                  <span className="font-semibold text-dark">{selectedPkg.makkahHotel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Madinah Hotel:</span>
                  <span className="font-semibold text-dark">{selectedPkg.madinahHotel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Transportation:</span>
                  <span className="font-semibold text-dark">{selectedPkg.transportation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Haram Walkway:</span>
                  <span className="font-bold text-accent">{selectedPkg.distanceToHaram}</span>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-150">
                <button
                  onClick={() => setSelectedPkg(null)}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-dark text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer"
                >
                  Close Detail
                </button>
                <button
                  onClick={() => {
                    onOpenBooking(selectedPkg.name, activeTab === 'Hajj' ? 'hajj' : 'umrah', selectedPkg.price);
                    setSelectedPkg(null);
                  }}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-xs font-bold tracking-wider uppercase rounded-xl shadow-md cursor-pointer"
                >
                  Book Pilgrim Seat
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
