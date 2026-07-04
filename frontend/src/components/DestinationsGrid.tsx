/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Star, MapPin, ArrowRight } from 'lucide-react';
import { DESTINATIONS } from '../data/travelData';
import { Destination } from '../types';

interface DestinationsGridProps {
  onSelectDestination: (destName: string) => void;
  selectedDestination: string;
  content?: any[];
}

export default function DestinationsGrid({ onSelectDestination, selectedDestination, content }: DestinationsGridProps) {
  return (
    <section id="destinations" className="py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">Our Core Footprint</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
              Explore Popular Destinations
            </h2>
            <div className="h-0.5 w-16 bg-accent rounded"></div>
            <p className="font-sans text-sm text-text-light mt-4">
              Handpicked nations where our physical coordination, pre-approved hotel blocks, and localized coordinators promise luxury safety.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            {selectedDestination && (
              <button
                onClick={() => onSelectDestination('')}
                className="text-xs font-bold tracking-widest uppercase text-accent hover:text-accent-dark border-b border-accent pb-1 cursor-pointer"
              >
                Clear Destination Filter ×
              </button>
            )}
          </div>
        </div>

        {/* Dynamic Destinations Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          
          {(content?.length ? content : DESTINATIONS).map((dest: any) => {
            const isSelected = selectedDestination.toLowerCase() === dest.name.toLowerCase();
            return (
              <div
                key={dest.id}
                onClick={() => {
                  onSelectDestination(dest.name);
                  // Scroll slightly down to packages list to show filtered content
                  document.getElementById('packages')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`relative group h-[400px] rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                  isSelected ? 'ring-4 ring-accent ring-offset-4' : 'border border-white/40'
                }`}
              >
                {/* Destination Banner Image */}
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                />

                {/* Dark Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/95 via-dark/40 to-transparent transition-opacity duration-300" />

                {/* Tag indicators */}
                <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
                  <span className="bg-white/15 backdrop-blur-md text-white text-xs font-medium px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1">
                    <Star className="w-3.5 h-3.5 fill-accent text-accent" />
                    <span>{dest.rating || 4.8}</span>
                  </span>
                  
                  <span className="bg-dark/60 backdrop-blur-md text-accent text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded border border-accent/20">
                    {dest.attractionsCount || 0} Landmarks
                  </span>
                </div>

                {/* Bottom details content */}
                <div className="absolute bottom-0 left-0 w-full p-6 z-10 flex flex-col justify-end h-1/2">
                  <span className="text-accent text-[11px] font-bold tracking-widest uppercase mb-1 flex items-center">
                    <MapPin className="w-3.5 h-3.5 mr-1" />
                    {dest.country || dest.destination || 'Destination'}
                  </span>
                  
                  <h3 className="font-display font-bold text-2xl text-white mb-2 group-hover:text-gold-gradient transition-all duration-300">
                    {dest.name}
                  </h3>
                  
                  <p className="font-sans text-xs text-gray-300 line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity mb-4">
                    {dest.description}
                  </p>

                  <div className="flex justify-between items-center pt-3 border-t border-white/10 mt-1">
                    <span className="text-xs text-gray-400">
                      Packages from <span className="text-white text-sm font-bold font-sans">${dest.averagePrice || 0}+</span>
                    </span>
                    <span className="text-white group-hover:text-accent transform group-hover:translate-x-1 duration-300 text-xs font-semibold flex items-center space-x-1">
                      <span>View tours</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
