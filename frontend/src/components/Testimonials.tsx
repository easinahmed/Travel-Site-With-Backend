/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  location: string;
  text: string;
  rating: number;
  image: string;
  tag: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const list: Testimonial[] = [
    {
      id: 1,
      name: "Dr. Mashrafe Bin Mortaza",
      role: "Senior Consultant, United Hospital",
      location: "Dhaka, Bangladesh",
      text: "Booking the Royal Elite Star Umrah Package was the best decision for my parents. The hotels in Makkah (Swissôtel Al Maqam) and Madinah (Pullman Zamzam) were steps away from the Haram courtyards. The specialized scholar Muallem was with us during every step of the rituals, resolving all physical and ritual hurdles instantly. Exceptionally premium coordination!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=150&h=150&q=80",
      tag: "Umrah Pilgrimage"
    },
    {
      id: 2,
      name: "Sabrina Yasmin",
      role: "Corporate Lead, Tech Frontiers Ltd",
      location: "Chittagong, Bangladesh",
      text: "The Bosphorus Yacht tour and Cappadocia hot air balloon tickets we got on our Turkish Marvels tour were absolute magic! TR Travel handled all minor flight transfers, local entry fees, and custom vegetarian food requests seamlessly. There were zero unexpected expenses; everything matched the digital brochure terms exactly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&h=150&q=80",
      tag: "Turkey Vacation"
    },
    {
      id: 3,
      name: "Faisal Rahman",
      role: "Real Estate Businessman",
      location: "Sylhet, Bangladesh",
      text: "I needed a Dubai e-Visa quickly for an emergency property deal. TR Travel took scan files via WhatsApp and within 24 hours, the official PDF was sent directly to my email! I also booked their Dubai Opulence 5-day tour with Atlantis stay, which was flawless. I can't recommend their fast-track visa desks enough.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
      tag: "Fast Dubai Visa & Tour"
    }
  ];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + list.length) % list.length);
  };

  const activeTestimonial = list[currentIndex];

  return (
    <section className="py-24 bg-secondary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">Client Happiness</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Words From Our Noble Travelers
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 rounded1"></div>
        </div>

        {/* Testimonial Box Wrapper */}
        <div className="max-w-4xl mx-auto relative bg-white rounded-3xl shadow-xl border border-gray-105 p-8 sm:p-14 animate-scale-up">
          
          <Quote className="w-16 h-16 text-accent/10 absolute top-8 left-8" />
          
          {/* Individual slide content */}
          <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
            
            {/* User Photo */}
            <div className="shrink-0 relative">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl overflow-hidden border-2 border-accent relative shadow-lg">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-2 -right-2 bg-dark text-white rounded-full p-1 border-2 border-white">
                <CheckCircle className="w-4 h-4 text-accent fill-accent text-[9px]" />
              </span>
            </div>

            {/* Quote details */}
            <div className="space-y-4 text-center md:text-left flex-1">
              
              <div className="flex justify-center md:justify-start space-x-1">
                {Array.from({ length: activeTestimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              <span className="inline-block bg-accent/10 text-accent font-sans font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 rounded">
                ✔ {activeTestimonial.tag}
              </span>

              <p className="font-sans italic text-sm sm:text-base text-text-light leading-relaxed">
                "{activeTestimonial.text}"
              </p>

              <div>
                <h4 className="font-sans font-bold text-base text-dark">{activeTestimonial.name}</h4>
                <div className="text-xs text-gray-400 font-medium">{activeTestimonial.role} — <strong>{activeTestimonial.location}</strong></div>
              </div>

            </div>

          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-10 md:mt-2.5 pt-6 border-t border-gray-100">
            <div className="text-xs text-gray-400">
              Showing testimonial <span className="font-semibold text-dark">{currentIndex + 1}</span> of {list.length}
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={handlePrev}
                className="p-2.5 rounded-xl border border-gray-100 hover:border-accent bg-gray-50 hover:bg-white text-dark hover:text-accent transition-all cursor-pointer shadow-2xs"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2.5 rounded-xl border border-gray-100 hover:border-accent bg-gray-50 hover:bg-white text-dark hover:text-accent transition-all cursor-pointer shadow-2xs"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
