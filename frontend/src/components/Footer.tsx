/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Plane, Facebook, Twitter, Instagram, Send, Mail, CheckCircle, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  content?: any;
  onAdminClick?: () => void;
}

export default function Footer({ onNavigate, content, onAdminClick }: FooterProps) {
  const [subEmail, setSubEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail) return;
    setIsSubscribed(true);
    setSubEmail('');
    
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  return (
    <footer className="bg-dark text-white pt-20 pb-10 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Upper grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Col */}
          <div className="space-y-6">
            <button 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2 text-left cursor-pointer focus:outline-none"
            >
              <div className="p-2.5 bg-accent rounded-lg text-white">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <div>
                <span className="font-sans font-bold tracking-wider text-xl block">
                  TR <span className="text-accent">TRAVEL</span>
                </span>
                <span className="text-[9px] block tracking-widest uppercase -mt-0.5 text-gray-400">
                  Premium Expeditions
                </span>
              </div>
            </button>
            
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              {content?.description || 'Fully approved Ministry of Religious Affairs Pilgrimage sponsor and designated IATA Travel Broker. Curating elite journeys for generations.'}
            </p>

            {/* Social handles */}
            <div className="flex space-x-3.5">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-accent border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-accent border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="p-2.5 bg-white/5 hover:bg-accent border border-white/10 rounded-lg text-gray-300 hover:text-white transition-all cursor-pointer">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-6">
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-accent">Agency Verticals</h4>
            <ul className="space-y-3 text-xs text-gray-400 font-medium">
              <li>
                <button onClick={() => onNavigate('packages')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Holiday Packages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('hajj-umrah')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Hajj & Umrah Pilgrimages
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visa-services')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Embassy Visa Fast-track
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about-us')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Executive Management Team
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Physical Office coordinates
                </button>
              </li>
            </ul>
          </div>

          {/* Dest quick link */}
          <div className="space-y-6">
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-accent">Top Expeditions</h4>
            <ul className="space-y-3 text-xs text-gray-400 font-medium">
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Saudi Arabia (Makkah/Medina)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Turkey (Cappadocia & Istanbul)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Dubai & Palm Jumeirah Glamour
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Malaysia, Thailand & Singapore tours
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('destinations')} className="hover:text-accent transition-colors block text-left cursor-pointer">
                  Bangladesh Rivers & Sea Coasts
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter subscription */}
          <div className="space-y-6">
            <h4 className="font-sans font-bold text-sm uppercase tracking-widest text-accent">{content?.newsletterTitle || 'Newsletter Despatch'}</h4>
            <p className="font-sans text-xs text-gray-400 leading-relaxed">
              Subscribe to capture seasonal flash sales on Makkah accommodation suites and Turkish flight allotments.
            </p>

            {isSubscribed ? (
              <div className="bg-emerald-900/40 border border-emerald-805 text-emerald-300 text-xs p-4 rounded-xl flex items-center space-x-2 animate-fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Your luxury email"
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  className="bg-white/5 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:ring-1 focus:ring-accent flex-1 placeholder:text-gray-500 text-white"
                />
                <button
                  type="submit"
                  className="bg-accent hover:bg-accent-dark text-white p-3 rounded-xl transition-all cursor-pointer shadow-md"
                  aria-label="Subscribe"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            <div className="flex items-center space-x-2 text-[10px] text-gray-500">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>Zero transactional advertising spam guarantee</span>
            </div>
          </div>

        </div>

        {/* Lower row details & copyrights */}
        <div className="pt-10 border-t border-zinc-800 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 font-sans font-normal">
          <div className="mb-4 md:mb-0 text-center md:text-left">
            <p>{content?.copyright || `© ${new Date().getFullYear()} TR Travel. All Rights Reserved Worldwide.`}</p>
            <p className="mt-0.5 text-[10px] text-gray-600">Approved Civil Aviation Agent of Bangladesh License #90218-CAAB</p>
            <p className="mt-1.5 text-[11px] text-gray-500 font-medium">Developed by <span className="text-accent hover:underline">doctypesolution</span></p>
          </div>
          
          <div className="flex flex-wrap gap-6 justify-center">
            <a href="#terms" className="hover:text-accent">Service Charter Guidelines</a>
            <a href="#privacy" className="hover:text-accent">Pilgrim Data Handling Protection</a>
            {onAdminClick && (
              <button onClick={onAdminClick} className="hover:text-accent cursor-pointer focus:outline-none">
                🔐 Admin Control Desk
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
}
