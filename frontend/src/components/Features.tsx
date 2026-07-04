/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldCheck, HeartHandshake, BadgePercent, Clock, Star, Landmark } from 'lucide-react';

export default function Features({ content }: { content?: any[] }) {
  const highlights = content?.length ? content : [
    {
      icon: <Clock className="w-6 h-6 text-accent" />,
      title: "Easy Online Booking",
      description: "Book flights, premium accommodation tours, and secure visa consultancies instantly with streamlined electronic pipelines."
    },
    {
      icon: <BadgePercent className="w-6 h-6 text-accent" />,
      title: "Best Price Guarantee",
      description: "Direct tie-ups with premium 5-Star chains in Makkah, Turkey, and Singapore ensure unbeatable luxury pricing structures."
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-accent" />,
      title: "24/7 Customer Support",
      description: "A continuous, reliable support desk located in Dhaka and dedicated agents active on WhatsApp to resolve travel dilemmas."
    },
    {
      icon: <Star className="w-6 h-6 text-accent" />,
      title: "Trusted Travel Experts",
      description: "Highly experienced Muallems for Hajj & Umrah, certified historians guides, and veteran visa specialists at your service."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-accent" />,
      title: "Secure Payments",
      description: "Your money is protected by multiple encryption layers. Safe card/bank settlements and full invoicing issued instantly."
    },
    {
      icon: <Landmark className="w-6 h-6 text-accent" />,
      title: "Custom Travel Plans",
      description: "Tailor-make your family itinerary, from dedicated luxury land transfers to customized culinary lists in destinations."
    }
  ];

  return (
    <section className="py-24 bg-[#FCFCFC] border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">Why Choose TR Travel</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Uncompromising Excellence In Global Leisure & Pilgrimages
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-2 rounded"></div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white hover:bg-secondary p-8 rounded-2xl border border-gray-100/80 hover:border-accent/20 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                <div className="p-3.5 bg-gray-50 group-hover:bg-accent/10 rounded-xl inline-flex items-center justify-center mb-6 transition-all duration-300">
                  {item.icon || <ShieldCheck className="w-6 h-6 text-accent" />}
                </div>
                <h3 className="font-sans font-bold text-lg text-dark mb-3">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-text-light leading-relaxed">
                  {item.description}
                </p>
              </div>
              
              <div className="mt-6 flex items-center space-x-1.5 text-accent text-xs font-bold uppercase tracking-wider group-hover:translate-x-1.5 transition-transform duration-300">
                <span>Learn scope</span>
                <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
