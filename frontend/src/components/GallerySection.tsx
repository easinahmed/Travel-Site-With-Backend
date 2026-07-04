/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

interface PhotoItem {
  id: number;
  url: string;
  title: string;
  location: string;
  tag: string;
  aspectClass: string;
}

export default function GallerySection({ content }: { content?: any[] }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const photos: PhotoItem[] = content?.length ? content.map((item: any, index: number) => ({
    id: item.id || index + 1,
    url: item.url,
    title: item.title,
    location: item.location,
    tag: item.tag,
    aspectClass: item.aspectClass || 'h-80'
  })) : [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&w=700&q=80",
      title: "Spiritual Devotion inside Masjid al-Haram",
      location: "Makkah, Saudi Arabia",
      tag: "Umrah",
      aspectClass: "h-80"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=700&q=80",
      title: "Magical Sunrise Ballooning over Historic Valleys",
      location: "Cappadocia, Turkey",
      tag: "Cultural Tour",
      aspectClass: "h-96"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=700&q=80",
      title: "The Breathtaking Futuristic Marina Skyline",
      location: "Dubai, UAE",
      tag: "Sightseeing",
      aspectClass: "h-72"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=700&q=80",
      title: "Fishermen Sailboat Cruise on the Longest Sandy Beach",
      location: "Cox's Bazar, Bangladesh",
      tag: "Nature",
      aspectClass: "h-96"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=700&q=80",
      title: "Sunset glow on the famous Twin Towers",
      location: "Kuala Lumpur, Malaysia",
      tag: "City Life",
      aspectClass: "h-80"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=700&q=80",
      title: "Spiritual Traditional Temples of Siam",
      location: "Bangkok, Thailand",
      tag: "Religious Landmarks",
      aspectClass: "h-72"
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=700&q=80",
      title: "Gardens by the Bay Supertree Light Show",
      location: "Marina Bay Sands, Singapore",
      tag: "Adventure",
      aspectClass: "h-96"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1543257580-7269da773bf5?auto=format&fit=crop&w=700&q=80",
      title: "Emerald Slopes of Sreemangal Estate",
      location: "Sylhet, Bangladesh",
      tag: "Nature",
      aspectClass: "h-80"
    }
  ];

  const handleNext = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex + 1) % photos.length);
  };

  const handlePrev = () => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((activePhotoIndex - 1 + photos.length) % photos.length);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-1 mb-2 text-accent">
            <Camera className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest font-sans">Captured Moments</span>
          </div>
          
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Our Shared Travel Memories
          </h2>
          <p className="font-sans text-sm text-text-light">
            Real photos captured by our tour batches, pilgrims, and lead coordinators during our premium international trips.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 rounded"></div>
        </div>

        {/* Dynamic Masonry-like Heights Grid Layout */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 [column-fill:_balance] box-border">
          {photos.map((photo, index) => (
            <div 
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className="break-inside-avoid mb-6 relative group overflow-hidden rounded-2xl cursor-pointer shadow-xs hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className={`${photo.aspectClass} w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105`}
              />

              {/* Glassmorphic/gradient bottom overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-5" />

              {/* Icon maximize */}
              <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-md hover:bg-accent text-white p-2.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Text detail */}
              <div className="absolute bottom-0 left-0 w-full p-5 text-white transform translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
                <span className="text-[10px] font-bold text-accent uppercase tracking-widest block mb-1">
                  📸 {photo.tag}
                </span>
                <h4 className="font-sans font-bold text-sm leading-tight mb-1">{photo.title}</h4>
                <p className="text-[10px] text-gray-300">{photo.location}</p>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* LIGHTBOX MODAL */}
      {activePhotoIndex !== null && (
        <div className="fixed inset-0 bg-dark/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-4">
          
          {/* Close trigger button */}
          <button
            onClick={() => setActivePhotoIndex(null)}
            className="absolute top-6 right-6 bg-white/10 hover:bg-white text-white hover:text-dark p-3 rounded-full cursor-pointer transition-all"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Core Slider Layout */}
          <div className="relative max-w-5xl w-full flex items-center justify-center">
            
            {/* Prev button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 p-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-dark transition-all cursor-pointer z-10 hidden sm:block"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Expanded Photo Card */}
            <div className="max-w-3xl max-h-[80vh] flex flex-col items-center bg-zinc-950 p-2 rounded-2xl border border-zinc-850 shadow-2xl relative">
              <img
                src={photos[activePhotoIndex].url}
                alt={photos[activePhotoIndex].title}
                className="max-h-[60vh] object-contain rounded-xl"
              />
              
              <div className="p-4 sm:p-6 text-center text-white w-full">
                <span className="text-accent text-[10px] font-bold tracking-widest uppercase block mb-1">
                  {photos[activePhotoIndex].tag}
                </span>
                <h3 className="font-display font-medium text-lg sm:text-xl text-white mb-1">
                  {photos[activePhotoIndex].title}
                </h3>
                <p className="text-xs text-gray-400 font-sans">
                  📍 {photos[activePhotoIndex].location}
                </p>
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute right-4 p-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-dark transition-all cursor-pointer z-10 hidden sm:block"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Touch assistance for mobile inside modal */}
          <div className="flex space-x-6 sm:hidden mt-6">
            <button
              onClick={handlePrev}
              className="px-6 py-2.5 bg-white/10 text-white rounded-lg cursor-pointer"
            >
              ◀ Previous
            </button>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 bg-white/10 text-white rounded-lg cursor-pointer"
            >
              Next ▶
            </button>
          </div>

        </div>
      )}

    </section>
  );
}
