/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Plane, Phone, Compass } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: (packageName?: string, pType?: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom') => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  content?: any;
}

export default function Navbar({ onOpenBooking, activeSection, onNavigate, content }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Packages', id: 'packages' },
    { label: 'Destinations', id: 'destinations' },
    { label: 'Hajj & Umrah', id: 'hajj-umrah' },
    { label: 'Visa Services', id: 'visa-services' },
    { label: 'About Us', id: 'about-us' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top micro-bar for contact info */}
      <div className={`hidden md:block transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'bg-dark text-white text-xs py-2'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center font-sans">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1.5 text-gray-300">
              <Phone className="w-3.5 h-3.5 text-accent" />
              <span>{content?.phone || '+880 1712-345678 (Dhaka)'}</span>
            </span>
            <span className="text-gray-500">|</span>
            <span className="text-gray-300">Email: {content?.email || 'info@trtravel.com'}</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="bg-accent/15 text-accent font-medium px-2 py-0.5 rounded text-[10px] tracking-wide uppercase">
              Approved IATA Agent
            </span>
            <span className="text-gray-400">Govt Reg No. TR-89201</span>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav 
        className={`w-full transition-all duration-300 py-4 px-6 md:px-12 ${
          isScrolled 
            ? 'glassmorphism shadow-md py-3 text-dark' 
            : 'bg-gradient-to-b from-dark/60 via-dark/30 to-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => handleLinkClick('home')}
            className="flex items-center space-x-2 focus:outline-none cursor-pointer group text-left"
          >
            <div className="p-2 bg-accent rounded-lg text-white group-hover:scale-105 transition-transform">
              <Plane className="w-5 h-5 -rotate-45" />
            </div>
            <div>
              <span className="font-sans font-bold tracking-wider text-xl block">
                {content?.brand || 'TR'} <span className={isScrolled ? 'text-accent' : 'text-accent-dark font-semibold'}>{content?.brand?.includes('TR') ? 'TRAVEL' : 'TRAVEL'}</span>
              </span>
              <span className={`text-[9px] block tracking-widest uppercase -mt-1 font-mono ${isScrolled ? 'text-gray-500' : 'text-gray-300'}`}>
                {content?.tagline || 'Premium Expeditions'}
              </span>
            </div>
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center space-x-8 font-sans font-medium text-sm">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative py-1 cursor-pointer transition-colors hover:text-accent font-sans ${
                    activeSection === item.id 
                      ? 'text-accent border-b-2 border-accent' 
                      : isScrolled ? 'text-dark' : 'text-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Call to action & Mobile toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => onOpenBooking(undefined, 'custom')}
              className={`hidden md:inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg font-sans text-xs font-semibold tracking-wide uppercase transition-all duration-300 cursor-pointer ${
                isScrolled
                  ? 'bg-dark hover:bg-opacity-95 text-white hover:shadow-lg'
                  : 'bg-white hover:bg-opacity-95 text-dark hover:shadow-lg'
              }`}
            >
              <Compass className="w-4 h-4 animate-spin-slow text-accent" />
              <span>Book Journey</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100/10 focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-dark/95 backdrop-blur-md flex flex-col pt-24 px-6 pb-8 transition-all duration-300">
          <ul className="flex-1 space-y-6 text-center text-lg font-sans font-normal text-white">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleLinkClick(item.id)}
                  className={`w-full py-2 hover:text-accent font-sans ${
                    activeSection === item.id ? 'text-accent border-b border-accent/20 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="space-y-4">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking(undefined, 'custom');
              }}
              className="w-full bg-accent hover:bg-accent-dark text-white py-3.5 rounded-xl font-sans font-bold tracking-widest text-xs uppercase"
            >
              Book Journey Now
            </button>
            <div className="text-center text-xs text-gray-400 font-sans">
              <p>Hotline: +880 1712-345678</p>
              <p className="mt-1">Govt Reg License Approved</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
