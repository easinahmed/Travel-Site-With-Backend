/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plane, ChevronRight, Search, Ticket, Calendar, Users, HelpCircle, ArrowRight } from 'lucide-react';

interface Airline {
  id: number;
  name: string;
  code: string;
  color: string; // Tailwinds bg/text colors or custom borders
  iconBg: string;
  textColor: string;
  logoChar: string; // Elegant initials fallback if required
  type: 'domestic' | 'international';
  rating: string;
}

function AirlineLogo({ code, logoChar, iconBg, className = "w-9 h-9" }: { code: string, logoChar: string, iconBg: string, className?: string }) {
  const [hasError, setHasError] = useState(false);
  const logoUrl = `https://images.kiwi.com/airlines/64/${code}.png`;

  if (hasError) {
    return (
      <div className={`${className} rounded-full ${iconBg} flex items-center justify-center text-white text-sm font-bold flex-shrink-0`}>
        {logoChar}
      </div>
    );
  }

  return (
    <div className={`${className} rounded-full bg-white flex items-center justify-center border border-gray-150 p-1.5 flex-shrink-0 transition-transform group-hover:scale-105 overflow-hidden`}>
      <img
        src={logoUrl}
        alt={`${code} Logo`}
        referrerPolicy="no-referrer"
        onError={() => setHasError(true)}
        className="w-full h-full object-contain"
      />
    </div>
  );
}

export default function TopAirlines({ content }: { content?: any[] }) {
  const [selectedAirline, setSelectedAirline] = useState<Airline | null>(null);
  const [origin, setOrigin] = useState('Dhaka (DAC)');
  const [destination, setDestination] = useState('Cox\'s Bazar (CXB)');
  const [travelDate, setTravelDate] = useState('');
  const [showFlightCheckSuccess, setShowFlightCheckSuccess] = useState(false);

  const airlines: Airline[] = content?.length ? content.map((item: any, index: number) => ({
    id: item.id || index + 1,
    name: item.name,
    code: item.code,
    color: item.color || 'border-gray-200',
    iconBg: item.iconBg || 'bg-gray-500',
    textColor: item.textColor || 'text-gray-600',
    logoChar: item.logoChar || item.name?.[0] || 'A',
    type: item.type || 'international',
    rating: item.rating || '4.5'
  })) : [
    {
      id: 1,
      name: "Biman Bangladesh Airlines",
      code: "BG",
      color: "border-emerald-600/30 hover:border-emerald-500",
      iconBg: "bg-emerald-600",
      textColor: "text-emerald-700",
      logoChar: "B",
      type: "domestic",
      rating: "4.5"
    },
    {
      id: 2,
      name: "US-Bangla Airlines",
      code: "BS",
      color: "border-blue-900/30 hover:border-blue-800",
      iconBg: "bg-blue-900",
      textColor: "text-blue-900",
      logoChar: "U",
      type: "domestic",
      rating: "4.6"
    },
    {
      id: 3,
      name: "NOVOAIR",
      code: "VQ",
      color: "border-blue-500/30 hover:border-blue-400",
      iconBg: "bg-blue-500",
      textColor: "text-blue-600",
      logoChar: "N",
      type: "domestic",
      rating: "4.4"
    },
    {
      id: 4,
      name: "Air Astra",
      code: "2A",
      color: "border-amber-500/30 hover:border-amber-400",
      iconBg: "bg-amber-500",
      textColor: "text-amber-600",
      logoChar: "A",
      type: "domestic",
      rating: "4.3"
    },
    {
      id: 5,
      name: "Emirates",
      code: "EK",
      color: "border-red-600/30 hover:border-red-500",
      iconBg: "bg-red-600",
      textColor: "text-red-600",
      logoChar: "E",
      type: "international",
      rating: "4.9"
    },
    {
      id: 6,
      name: "Singapore Airlines",
      code: "SQ",
      color: "border-indigo-950/30 hover:border-indigo-900",
      iconBg: "bg-indigo-950",
      textColor: "text-indigo-950",
      logoChar: "S",
      type: "international",
      rating: "4.9"
    },
    {
      id: 7,
      name: "Malaysia Airlines",
      code: "MH",
      color: "border-indigo-600/30 hover:border-indigo-500",
      iconBg: "bg-indigo-600",
      textColor: "text-indigo-700",
      logoChar: "M",
      type: "international",
      rating: "4.5"
    },
    {
      id: 8,
      name: "Qatar Airways",
      code: "QR",
      color: "border-rose-900/30 hover:border-rose-800",
      iconBg: "bg-rose-900",
      textColor: "text-rose-900",
      logoChar: "Q",
      type: "international",
      rating: "4.9"
    },
    {
      id: 9,
      name: "Saudia Airlines",
      code: "SV",
      color: "border-amber-700/30 hover:border-amber-600",
      iconBg: "bg-amber-700",
      textColor: "text-amber-800",
      logoChar: "S",
      type: "international",
      rating: "4.7"
    },
    {
      id: 10,
      name: "Air India",
      code: "AI",
      color: "border-orange-500/30 hover:border-orange-400",
      iconBg: "bg-orange-600",
      textColor: "text-orange-600",
      logoChar: "A",
      type: "international",
      rating: "4.2"
    },
    {
      id: 11,
      name: "Gulf Air",
      code: "GF",
      color: "border-yellow-600/30 hover:border-yellow-500",
      iconBg: "bg-yellow-600",
      textColor: "text-yellow-700",
      logoChar: "G",
      type: "international",
      rating: "4.4"
    },
    {
      id: 12,
      name: "Turkish Airlines",
      code: "TK",
      color: "border-red-700/30 hover:border-red-600",
      iconBg: "bg-red-700",
      textColor: "text-red-700",
      logoChar: "T",
      type: "international",
      rating: "4.8"
    },
    {
      id: 13,
      name: "Thai Airways International",
      code: "TG",
      color: "border-purple-800/30 hover:border-purple-700",
      iconBg: "bg-purple-800",
      textColor: "text-purple-800",
      logoChar: "T",
      type: "international",
      rating: "4.6"
    },
    {
      id: 14,
      name: "Cathay Pacific Airways",
      code: "CX",
      color: "border-teal-800/30 hover:border-teal-700",
      iconBg: "bg-teal-800",
      textColor: "text-teal-800",
      logoChar: "C",
      type: "international",
      rating: "4.8"
    },
    {
      id: 15,
      name: "China Southern Airlines",
      code: "CZ",
      color: "border-sky-600/30 hover:border-sky-500",
      iconBg: "bg-sky-600",
      textColor: "text-sky-600",
      logoChar: "C",
      type: "international",
      rating: "4.4"
    },
    {
      id: 16,
      name: "SriLankan Airlines",
      code: "UL",
      color: "border-teal-600/30 hover:border-teal-500",
      iconBg: "bg-teal-600",
      textColor: "text-teal-600",
      logoChar: "S",
      type: "international",
      rating: "4.5"
    },
    {
      id: 17,
      name: "AirAsia",
      code: "AK",
      color: "border-red-500/30 hover:border-red-400",
      iconBg: "bg-red-500",
      textColor: "text-red-600",
      logoChar: "A",
      type: "international",
      rating: "4.4"
    },
    {
      id: 18,
      name: "Batik Air",
      code: "OD",
      color: "border-rose-700/30 hover:border-rose-600",
      iconBg: "bg-rose-700",
      textColor: "text-rose-700",
      logoChar: "B",
      type: "international",
      rating: "4.3"
    },
    {
      id: 19,
      name: "IndiGo",
      code: "6E",
      color: "border-cyan-800/30 hover:border-cyan-700",
      iconBg: "bg-cyan-800",
      textColor: "text-cyan-800",
      logoChar: "I",
      type: "international",
      rating: "4.5"
    },
    {
      id: 20,
      name: "Air Arabia",
      code: "G9",
      color: "border-red-800/30 hover:border-red-700",
      iconBg: "bg-red-800",
      textColor: "text-red-800",
      logoChar: "A",
      type: "international",
      rating: "4.4"
    }
  ];

  const handleSearchFlight = (e: React.FormEvent) => {
    e.preventDefault();
    setShowFlightCheckSuccess(true);
    setTimeout(() => {
      setShowFlightCheckSuccess(false);
    }, 4500);
  };

  return (
    <section className="py-24 bg-secondary border-b border-gray-100 relative overflow-hidden" id="airlines">
      {/* Visual top/bottom accent paths */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent text-[11px] font-bold tracking-widest uppercase block mb-3">Partner Networks</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Search Top Airlines
          </h2>
          <p className="text-text-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            TR Travel's user-friendly platform connects you to top airlines instantly. Enjoy a comfortable and hassle-free journey on any destination and get tickets of top airlines easily.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-6 rounded"></div>
        </div>

        {/* Dynamic Interactive Airline Detail Card & Route Search block */}
        {selectedAirline && (
          <div className="mb-12 p-6 bg-white border border-accent/20 rounded-3xl shadow-xl transition-all animate-fade-in">
            <div className="flex flex-col lg:flex-row justify-between gap-8 items-start lg:items-center">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <AirlineLogo 
                    code={selectedAirline.code} 
                    logoChar={selectedAirline.logoChar} 
                    iconBg={selectedAirline.iconBg} 
                    className="w-8 h-8" 
                  />
                  <span className="text-xs bg-accent/10 text-accent-dark px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                    {selectedAirline.type} carrier
                  </span>
                  <span className="text-xs text-gray-500 font-mono">CODE: {selectedAirline.code}</span>
                </div>
                <h3 className="text-xl font-bold text-dark font-display">{selectedAirline.name}</h3>
                <p className="text-xs text-gray-500 mt-1">Direct operations out of Bangladesh airports. Rated {selectedAirline.rating}/5.0 by our travelers.</p>
              </div>

              {/* In-place Simple ticket assistant lookup form */}
              <form onSubmit={handleSearchFlight} className="w-full lg:w-auto flex flex-wrap lg:flex-nowrap items-end gap-3 bg-secondary/80 p-4 rounded-2xl border border-gray-150 relative">
                <div className="w-[140px] flex-grow">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">Depart</label>
                  <input 
                    type="text" 
                    value={origin} 
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-white text-xs text-dark font-sans font-medium rounded-lg h-9 px-2.5 border border-gray-200 focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="flex items-center justify-center pt-5">
                  <ArrowRight className="w-4 h-4 text-accent" />
                </div>

                <div className="w-[140px] flex-grow">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">Destination</label>
                  <input 
                    type="text" 
                    value={destination} 
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-white text-xs text-dark font-sans font-medium rounded-lg h-9 px-2.5 border border-gray-200 focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <div className="w-[130px] flex-grow">
                  <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500 mb-1.5">Date</label>
                  <input 
                    type="date" 
                    value={travelDate} 
                    onChange={(e) => setTravelDate(e.target.value)}
                    className="w-full bg-white text-xs text-dark font-sans font-medium rounded-lg h-9 px-2.5 border border-gray-200 focus:outline-none focus:border-accent"
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="bg-accent hover:bg-accent-dark text-white rounded-lg px-4 h-9 text-xs font-bold transition-all flex items-center space-x-1 hover:shadow-md cursor-pointer whitespace-nowrap self-end flex-grow sm:flex-grow-0 justify-center"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Request Fare</span>
                </button>
              </form>
            </div>

            {showFlightCheckSuccess && (
              <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium rounded-xl flex items-center space-x-2 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Connecting with <strong>{selectedAirline.name}</strong> flight schedules! Our team has received your ticket request from <strong>{origin}</strong> to <strong>{destination}</strong> and will call you with special group discount fares shortly.</span>
              </div>
            )}
          </div>
        )}

        {/* Traditional Airline Grid Layout matching the source visual design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {airlines.map((airline) => {
            const isSelected = selectedAirline?.id === airline.id;
            return (
              <div 
                key={airline.id}
                onClick={() => setSelectedAirline(airline)}
                className={`bg-white rounded-xl py-4 px-5 border ${airline.color} ${
                  isSelected ? 'ring-2 ring-accent border-accent shadow-md' : 'shadow-xs hover:shadow-md'
                } transition-all duration-200 cursor-pointer flex items-center justify-between group`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  {/* High contrast custom represented airline logo images */}
                  <AirlineLogo 
                    code={airline.code} 
                    logoChar={airline.logoChar} 
                    iconBg={airline.iconBg} 
                  />
                  
                  <div className="overflow-hidden">
                    <h4 className="text-xs sm:text-sm font-medium text-dark font-sans tracking-tight truncate group-hover:text-accent-dark transition-colors">
                      {airline.name}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400 capitalize block mt-0.5">
                      {airline.type} route
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1 pl-2">
                  <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Support helper details row */}
        <div className="mt-12 flex flex-col sm:flex-row justify-between items-center bg-white/60 rounded-2xl border border-gray-100 p-6 text-center sm:text-left gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-accent/10 text-accent p-2.5 rounded-xl">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-dark">Need special charters or multi-city tickets?</h4>
              <p className="text-[11px] text-gray-500 mt-0.5">Contact tr travel agents directly for special customized pilgrim combinations.</p>
            </div>
          </div>
          <a
            href="#contact"
            className="bg-dark hover:bg-dark/95 text-white text-xs font-bold tracking-wide uppercase px-5 py-2.5 rounded-xl transition-all hover:shadow-lg whitespace-nowrap"
          >
            Ask Ticketing Support
          </a>
        </div>

      </div>
    </section>
  );
}
