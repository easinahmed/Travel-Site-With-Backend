/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Star, Clock, MapPin, Search, Eye, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { TOUR_PACKAGES } from '../data/travelData';
import { Package } from '../types';

interface PackagesListProps {
  onOpenBooking: (packageName: string, pType: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom', basePrice: number) => void;
  selectedDestination: string;
  onSelectDestination: (destName: string) => void;
  content?: any[];
}

export default function PackagesList({ onOpenBooking, selectedDestination, onSelectDestination, content }: PackagesListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'tour' | 'featured'>('all');
  const [selectedDetailedPackage, setSelectedDetailedPackage] = useState<Package | null>(null);

  // Filter package items dynamically
  const filteredPackages = useMemo(() => {
    const packages = (content?.length ? content : TOUR_PACKAGES) as any[];
    return packages.filter((pkg) => {
      // Destination filter
      if (selectedDestination && (pkg.destination || pkg.country || '').toLowerCase() !== selectedDestination.toLowerCase()) {
        return false;
      }

      // Search query matching
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = pkg.name.toLowerCase().includes(query);
        const matchesDest = (pkg.destination || pkg.country || '').toLowerCase().includes(query);
        const matchesInclusions = (pkg.inclusions || []).some((inc: string) => inc.toLowerCase().includes(query));
        if (!matchesName && !matchesDest && !matchesInclusions) {
          return false;
        }
      }

      // Category tab filter
      if (activeCategory === 'featured' && !pkg.isFeatured) return false;
      if (activeCategory === 'tour' && pkg.type && pkg.type !== 'tour') return false;

      return true;
    });
  }, [selectedDestination, searchQuery, activeCategory]);

  return (
    <section id="packages" className="py-24 bg-[#FCFCFC] transition-all">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">Our Core Expeditions</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Custom-Curated Travel Packages
          </h2>
          <p className="font-sans text-sm text-text-light leading-relaxed">
            Every vacation features private local guides, luxury certified coordinates, highly reviewed premium hotels, and transparent invoicing.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 rounded"></div>
        </div>

        {/* Search and Filters Layout */}
        <div className="bg-white rounded-2xl border border-gray-150 p-6 md:p-8 shadow-sm mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === 'all' 
                  ? 'bg-dark text-white' 
                  : 'bg-secondary text-text-light hover:bg-gray-200/50 hover:text-dark'
              }`}
            >
              All Packages
            </button>
            <button
              onClick={() => setActiveCategory('featured')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all inline-flex items-center space-x-1 cursor-pointer ${
                activeCategory === 'featured' 
                  ? 'bg-accent text-white' 
                  : 'bg-secondary text-text-light hover:bg-gray-200/50 hover:text-dark'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>Signature Best Sellers</span>
            </button>
            <button
              onClick={() => setActiveCategory('tour')}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                activeCategory === 'tour' 
                  ? 'bg-dark text-white' 
                  : 'bg-secondary text-text-light hover:bg-gray-200/50 hover:text-dark'
              }`}
            >
              Classical Vacations
            </button>
          </div>

          {/* Search Box Inputs */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-4 top-[15px]" />
            <input
              type="text"
              placeholder="Search by spots, hotel, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-secondary text-dark text-xs pl-11 pr-4 py-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-transparent focus:border-accent transition-all"
            />
          </div>

        </div>

        {/* Active Filtering Notices */}
        {(selectedDestination || searchQuery) && (
          <div className="flex flex-wrap items-center gap-3 bg-secondary p-4 rounded-xl mb-8 text-xs font-semibold text-text-light">
            <span>Filtering ACTIVE:</span>
            {selectedDestination && (
              <span className="bg-white border border-gray-150 px-3 py-1 rounded-lg flex items-center space-x-1.5 shadow-xs">
                <span>Destination: <strong>{selectedDestination}</strong></span>
                <button onClick={() => onSelectDestination('')} className="text-accent hover:text-accent-dark ml-1 cursor-pointer">×</button>
              </span>
            )}
            {searchQuery && (
              <span className="bg-white border border-gray-150 px-3 py-1 rounded-lg flex items-center space-x-1.5 shadow-xs">
                <span>Matching: <strong>"{searchQuery}"</strong></span>
                <button onClick={() => setSearchQuery('')} className="text-accent hover:text-accent-dark ml-1 cursor-pointer">×</button>
              </span>
            )}
            <button 
              onClick={() => { onSelectDestination(''); setSearchQuery(''); }}
              className="ml-auto text-accent hover:underline text-[11px] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div 
              key={pkg.id} 
              className="bg-white rounded-2xl border border-gray-150 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Header Image */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  
                  {/* Badge */}
                  {pkg.isFeatured && (
                    <span className="absolute top-4 left-4 bg-accent text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full flex items-center space-x-1 shadow-sm">
                      <Sparkles className="w-3 h-3" />
                      <span>Best Seller</span>
                    </span>
                  )}

                  {/* Price overlay */}
                  <span className="absolute bottom-4 right-4 bg-white/95 text-dark font-sans font-bold text-sm px-4 py-1.5 rounded-lg border border-gray-150/50 shadow-sm">
                    Starting <strong className="text-accent text-base">${pkg.price}</strong>
                  </span>
                </div>

                {/* Body Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs font-semibold text-gray-400 mb-3">
                    <span className="flex items-center text-accent">
                      <MapPin className="w-3.5 h-3.5 mr-1" />
                      {pkg.destination || pkg.country}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {pkg.duration}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-dark mb-2 line-clamp-1 group-hover:text-accent transition-colors">
                    {pkg.name}
                  </h3>

                  <p className="font-sans text-xs text-text-light mb-4 line-clamp-2 leading-relaxed">
                    {pkg.description}
                  </p>

                  <div className="flex items-center space-x-1.5 mb-6 bg-secondary/80 p-2 rounded-xl text-xs font-medium text-gray-500">
                    <Star className="w-4 h-4 fill-accent text-accent" />
                    <span><strong>{pkg.rating}</strong> ({pkg.reviewsCount} verified reviews)</span>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">Highlights Included:</span>
                    {(pkg.inclusions || []).slice(0, 3).map((inclusion: string, idx: number) => (
                      <div key={idx} className="flex items-center text-xs text-text-light font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent mr-1.5 shrink-0" />
                        <span className="truncate">{inclusion}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-6 pt-0 border-t border-gray-100 mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedDetailedPackage(pkg)}
                  className="w-full py-3 bg-secondary hover:bg-gray-200/50 text-dark font-sans font-bold text-xs tracking-wider uppercase rounded-xl transition-colors inline-flex items-center justify-center space-x-1 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Itinerary</span>
                </button>
                <button
                  onClick={() => onOpenBooking(pkg.name, (pkg.type || 'tour') as any, pkg.price)}
                  className="w-full py-3 bg-dark hover:bg-opacity-95 text-white font-sans font-bold text-xs tracking-wider uppercase rounded-xl transition-all shadow-xs cursor-pointer"
                >
                  Book Seat
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPackages.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-305 text-center py-16 px-6 max-w-lg mx-auto">
            <span className="block text-4xl mb-4">🔍</span>
            <h3 className="font-display font-bold text-lg text-dark mb-2">No Packages Match</h3>
            <p className="font-sans text-xs text-text-light mb-6">
              We currently don't see any custom packages matching your filters. Feel free to contact our Dhaka specialists to construct a tailored tour!
            </p>
            <button
              onClick={() => {
                onSelectDestination('');
                setSearchQuery('');
                setActiveCategory('all');
              }}
              className="px-5 py-2.5 bg-accent text-white hover:bg-accent-dark text-xs font-bold tracking-wider uppercase rounded-lg cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* DETAILED PACKAGE SLIDEOVER / MODAL */}
      {selectedDetailedPackage && (
        <div className="fixed inset-0 bg-dark/65 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-100">
            <div className="relative h-64 sm:h-80">
              <img
                src={selectedDetailedPackage.image}
                alt={selectedDetailedPackage.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/30 to-transparent" />
              <button
                onClick={() => setSelectedDetailedPackage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white text-white hover:text-dark p-2 rounded-full cursor-pointer transition-all"
              >
                ×
              </button>
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-accent text-white text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-2 inline-block">
                  {selectedDetailedPackage.destination}
                </span>
                <h3 className="font-display font-medium text-2xl sm:text-3xl text-white mb-2 leading-tight">
                  {selectedDetailedPackage.name}
                </h3>
                <p className="text-xs text-gray-300 font-sans">{selectedDetailedPackage.duration}</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
              
              {/* Left Column: Itinerary and Details */}
              <div className="md:col-span-7 space-y-6">
                <div>
                  <h4 className="font-sans font-bold text-sm text-dark mb-3 border-b pb-1.5 uppercase tracking-wide">Daily Itinerary Outline</h4>
                  <div className="space-y-4">
                    {selectedDetailedPackage.itinerary.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs">
                        <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-semibold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-text-light leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-sans font-bold text-sm text-dark mb-3 border-b pb-1.5 uppercase tracking-wide">Key Landmarks Covered</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDetailedPackage.spots.map((spot, idx) => (
                      <span key={idx} className="bg-secondary text-dark text-[11px] font-semibold px-3 py-1 rounded-md">
                        📌 {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Inclusions and Booking Call */}
              <div className="md:col-span-5 space-y-6">
                <div className="bg-secondary p-5 rounded-xl border border-gray-150">
                  <h4 className="font-sans font-bold text-xs text-dark mb-3 uppercase tracking-wider block">Exclusive Inclusions:</h4>
                  <div className="space-y-2">
                    {selectedDetailedPackage.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-center text-xs text-text-light font-sans">
                        <CheckCircle2 className="w-4 h-4 text-accent mr-2 shrink-0" />
                        <span>{inc}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-5 rounded-xl text-center">
                  <div className="text-[11px] font-bold text-gray-400 uppercase mb-1">Standard Premium Package Price</div>
                  <div className="font-sans font-bold text-3xl text-dark mb-1">
                    ${selectedDetailedPackage.price} <span className="text-xs text-gray-500 font-medium">/ person</span>
                  </div>
                  <div className="text-[11px] text-gray-400 mb-5">Includes luxury hotel accommodation setup: {selectedDetailedPackage.hotels[0]}</div>
                  
                  <button
                    onClick={() => {
                      onOpenBooking(selectedDetailedPackage.name, selectedDetailedPackage.type as any, selectedDetailedPackage.price);
                      setSelectedDetailedPackage(null);
                    }}
                    className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-transform hover:-translate-y-0.5 cursor-pointer"
                  >
                    Select Dates & Book
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </section>
  );
}
