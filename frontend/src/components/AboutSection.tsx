/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Target, Heart, Eye, Award, CheckCircle, Flame } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  specialty: string;
  image: string;
  bio: string;
}

export default function AboutSection({ content }: { content?: any }) {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision' | 'values'>('mission');

  const team: TeamMember[] = content?.team?.length ? content.team.map((member: any, index: number) => ({
    id: member.id || index + 1,
    name: member.name,
    role: member.role,
    specialty: member.specialty,
    image: member.image,
    bio: member.bio
  })) : [
    {
      id: 1,
      name: "Al-Haj Tazul Rahman",
      role: "Managing Director & Founder",
      specialty: "Pilgrim Logistics & Operations",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150&q=80",
      bio: "Over 18 years of continuous devotion managing premium accommodation blocks in Makkah and Medina, guaranteeing pilgrims luxury security and peace of mind."
    },
    {
      id: 2,
      name: "Tariqul Islam Chowdhury",
      role: "Director of International Leisure",
      specialty: "European & Southeast Asian Itineraries",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80",
      bio: "An enthusiastic tourist planner who has personally surveyed over 40 countries, forging exclusive wholesale hotel pricing contracts for TR clients."
    },
    {
      id: 3,
      name: "Ferdousi Begum",
      role: "Head of Consular & Visa Operations",
      specialty: "Sticker Class Scrutiny Desk",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&h=150&q=80",
      bio: "Former consular helper with accurate knowledge of electronic portals and embassy appointment guidelines, leading our high visa approval success rates."
    }
  ];

  return (
    <section id="about-us" className="py-24 bg-secondary/80 border-t border-b border-gray-150/40">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Left Column: Story */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-accent text-xs font-bold tracking-widest uppercase block">{content?.eyebrow || 'Our Heritage'}</span>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark leading-tight">
              {content?.title || 'Honoring Trust, Delivering Luxury Adventures'}
            </h2>
            <div className="h-0.5 w-16 bg-accent rounded"></div>
            
            { (content?.intro || []).map((paragraph: string, index: number) => (
              <p key={index} className="font-sans text-xs sm:text-sm text-text-light leading-relaxed">{paragraph}</p>
            )) }

            {/* Quick trust stamps */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {(content?.highlights || ['Government Authorized Agency', 'Approved IATA Global Code', 'Over 15,000+ Happy Pilgrims', '24/7 Dedicated Ground Crew']).map((item: string, index: number) => (
                <div key={index} className="flex items-center space-x-2 text-xs font-semibold text-dark">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Mission Vision Interactive tabs */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-150 shadow-lg">
            
            <div className="flex border-b border-gray-150 pb-4 mb-6 gap-2">
              <button
                onClick={() => setActiveTab('mission')}
                className={`flex-1 py-2 text-center text-xs font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'mission' ? 'bg-dark text-white' : 'text-gray-400 hover:text-dark'
                }`}
              >
                Mission
              </button>
              <button
                onClick={() => setActiveTab('vision')}
                className={`flex-1 py-2 text-center text-xs font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'vision' ? 'bg-dark text-white' : 'text-gray-400 hover:text-dark'
                }`}
              >
                Vision
              </button>
              <button
                onClick={() => setActiveTab('values')}
                className={`flex-1 py-2 text-center text-xs font-bold tracking-widest uppercase rounded-lg transition-all cursor-pointer ${
                  activeTab === 'values' ? 'bg-dark text-white' : 'text-gray-400 hover:text-dark'
                }`}
              >
                Values
              </button>
            </div>

            {/* Display active tab content */}
            <div className="space-y-4 min-h-40 flex flex-col justify-center">
              {activeTab === 'mission' && (
                <div className="animate-fade-in space-y-3">
                  <div className="p-3 bg-accent/10 rounded-xl inline-block text-accent">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-dark">{content?.mission?.title || 'To Demystify Standard Group Tours'}</h4>
                  <p className="font-sans text-xs text-text-light leading-relaxed">
                    {content?.mission?.description || 'Our mission is providing fully transparent travel deliverables, eliminating hidden costs, and establishing absolute elite luxury stay conditions that physical flyers and pilgrims expect.'}
                  </p>
                </div>
              )}

              {activeTab === 'vision' && (
                <div className="animate-fade-in space-y-3">
                  <div className="p-3 bg-accent/10 rounded-xl inline-block text-accent">
                    <Eye className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-dark">{content?.vision?.title || 'A Globally Synchronized Agency Ecosystem'}</h4>
                  <p className="font-sans text-xs text-text-light leading-relaxed">
                    {content?.vision?.description || 'We envision a synchronized digital ecosystem ensuring Bangladeshi travellers secure immediate visa permits, top-tier airline tickets, and flawless, personalized ground guidance in seconds.'}
                  </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="animate-fade-in space-y-3">
                  <div className="p-3 bg-accent/10 rounded-xl inline-block text-accent">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="font-sans font-bold text-base text-dark">{content?.values?.title || 'Loyalty, Directness & Respect'}</h4>
                  <p className="font-sans text-xs text-text-light leading-relaxed">
                    {content?.values?.description || 'We maintain deep spiritual reverence during holy operations, radical honesty about distances to physical steps, and ultimate respect for every traveler’s lifetime resources.'}
                  </p>
                </div>
              )}
            </div>

          </div>

        </div>

        {/* Team Members Section */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-2">Our Brains Trust</span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-dark">Meet Our Dedicated Leadership</h3>
            <div className="h-0.5 w-12 bg-accent mx-auto mt-3 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member) => (
              <div 
                key={member.id}
                className="bg-white rounded-2xl border border-gray-150 p-6 sm:p-8 flex flex-col items-center text-center shadow-xs hover:shadow-xl transition-all duration-300"
              >
                <div className="w-20 h-20 rounded-full overflow-hidden border border-accent p-1 mb-4 shadow-sm">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                
                <h4 className="font-sans font-bold text-base text-dark mb-0.5">{member.name}</h4>
                <div className="text-accent text-xs font-semibold uppercase tracking-wider mb-1">{member.role}</div>
                <div className="text-[10px] text-gray-400 font-mono mb-4">{member.specialty}</div>
                
                <p className="font-sans text-xs text-text-light leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
