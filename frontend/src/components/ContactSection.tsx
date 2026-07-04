/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, Send, CheckCircle, MapPin, Building, Info } from 'lucide-react';

export default function ContactSection({ content }: { content?: any }) {
  const [activeOffice, setActiveOffice] = useState<'dhaka' | 'makkah'>('dhaka');
  
  // Form handling
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [pkgInterest, setPkgInterest] = useState('General Custom Query');
  const [msg, setMsg] = useState('');
  const [formSent, setFormSent] = useState(false);

  // Office data
  const officeData = content?.offices || {
    dhaka: {
      address: "Suites 405-407, Landmark Tower, Road 11, Banani C/A, Dhaka-1213, Bangladesh",
      phone: "+880 1712-345678",
      hotline: "+880 9612-TRTRAVEL",
      email: "dhaka.desk@trtravel.com",
      latitude: "23.7937° N",
      longitude: "90.4066° E",
      mapColor: "bg-slate-100"
    },
    makkah: {
      address: "Tower 3, King Abdul Aziz Endowment Clock Tower, Abraj Al Bait, Makkah, Saudi Arabia",
      phone: "+966 50 123 4567",
      hotline: "+966 12 570 0000",
      email: "makkah.desk@trtravel.com",
      latitude: "21.4192° N",
      longitude: "39.8263° E",
      mapColor: "bg-amber-50"
    }
  };

  const currentOffice = officeData[activeOffice];

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      alert('Kindly fill out your contact details (Name, Email, Phone) so we can respond.');
      return;
    }
    
    setFormSent(true);
    // Clear forms
    setName('');
    setEmail('');
    setPhone('');
    setMsg('');

    // Clear alert after some time
    setTimeout(() => {
      setFormSent(false);
    }, 6000);
  };

  const handleWhatsAppClick = () => {
    // Open standard Whatsapp format
    window.open('https://wa.me/8801712345678?text=Hello%20TR%20Travel!%20I%20am%20interested%20in%20your%20holiday/Hajj%20packages.', '_blank');
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">Get In Touch</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Connect With Our Tour Specialists
          </h2>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 rounded"></div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          
          {/* Column 1: Hotlines, Social Buttons, Office Select */}
          <div className="lg:col-span-5 space-y-8">
            
            <div className="space-y-4">
              <h3 className="font-display font-bold text-xl text-dark">Dhaka & Makkah Command Operations</h3>
              <p className="font-sans text-xs text-text-light leading-relaxed">
                {content?.description || 'Connect via phone, email, or schedule an in-person meeting. Select an office down below to synchronize structural coordinates, hotlines, and instant WhatsApp support numbers.'}
              </p>
            </div>

            {/* Office Toggles */}
            <div className="flex gap-2 bg-secondary p-1.5 rounded-xl border border-gray-150">
              <button
                onClick={() => setActiveOffice('dhaka')}
                className={`flex-1 py-3 text-center text-xs font-bold tracking-wider rounded-lg uppercase transition-all cursor-pointer ${
                  activeOffice === 'dhaka' ? 'bg-dark text-white shadow-sm' : 'text-gray-500 hover:text-dark'
                }`}
              >
                Dhaka Headquarters
              </button>
              <button
                onClick={() => setActiveOffice('makkah')}
                className={`flex-1 py-3 text-center text-xs font-bold tracking-wider rounded-lg uppercase transition-all cursor-pointer ${
                  activeOffice === 'makkah' ? 'bg-dark text-white shadow-sm' : 'text-gray-500 hover:text-dark'
                }`}
              >
                Makkah Office
              </button>
            </div>

            {/* Selected Office Details Card */}
            <div className="bg-secondary/70 rounded-2xl p-6 sm:p-8 space-y-6 border border-gray-150/40 animate-scale-up">
              
              <div className="flex items-start space-x-3.5">
                <MapPin className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Physical Address</span>
                  <p className="font-sans text-xs font-bold text-dark leading-relaxed">
                    {currentOffice.address}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Hotline Tel</span>
                    <span className="text-xs font-bold text-dark">{currentOffice.hotline}</span>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider block">Official Support</span>
                    <span className="text-xs font-bold text-dark">{currentOffice.email}</span>
                  </div>
                </div>
              </div>

              {/* Direct Touch Buttons: Phone Dial, Mail, WhatsApp */}
              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-gray-150">
                <a
                  href={`tel:${currentOffice.phone}`}
                  className="bg-white border border-gray-150 rounded-xl py-3 text-center text-[10px] font-bold text-dark hover:border-accent hover:text-accent transition-all flex flex-col items-center justify-center space-y-1"
                >
                  <Phone className="w-4 h-4 text-accent" />
                  <span>Call Desk</span>
                </a>
                
                <a
                  href={`mailto:${currentOffice.email}`}
                  className="bg-white border border-gray-150 rounded-xl py-3 text-center text-[10px] font-bold text-dark hover:border-accent hover:text-accent transition-all flex flex-col items-center justify-center space-y-1"
                >
                  <Mail className="w-4 h-4 text-accent" />
                  <span>Email Direct</span>
                </a>

                <button
                  onClick={handleWhatsAppClick}
                  className="bg-emerald-50 border border-emerald-100 rounded-xl py-3 text-center text-[10px] font-bold text-emerald-800 hover:bg-emerald-100 transition-all flex flex-col items-center justify-center space-y-1 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>

            </div>

          </div>

          {/* Column 2: Interactive Contact Email Form */}
          <div className="lg:col-span-7 bg-white border border-gray-150 rounded-3xl p-6 sm:p-10 shadow-lg">
            
            <div className="mb-8">
              <h3 className="font-display font-bold text-xl text-dark">Submit Direct Travel Inquiry</h3>
              <p className="font-sans text-xs text-text-light leading-relaxed">
                Provide your structural travel plans down below. Our destination specialists respond with full quote booklets in less than 3 hours.
              </p>
            </div>

            {formSent ? (
              <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-2xl py-12 text-center space-y-4 animate-scale-up">
                <span className="text-4xl block">📩</span>
                <h4 className="font-sans font-bold text-emerald-800 text-base">Inquiry Submitted Successfully!</h4>
                <p className="text-xs text-emerald-700 leading-relaxed max-w-sm mx-auto">
                  Thank you. We have securely registered your inquiry. One of our lead advisors (or Muallem for pilgimages) will contact your phone or dispatch an email quote in less than 3 hours.
                </p>
                <div className="text-[10px] text-emerald-600 bg-white/40 border border-emerald-100/50 p-3 rounded-lg max-w-xs mx-auto">
                  A copy of this ticket has been sent to your inbox.
                </div>
              </div>
            ) : (
              <form onSubmit={handleMessageSubmit} className="space-y-5">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Tazul Islam"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-transparent focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="tazul@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-transparent focus:border-accent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Active Telephone</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g., +880 1712..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-transparent focus:border-accent"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Package Category Interest</label>
                    <select
                      value={pkgInterest}
                      onChange={(e) => setPkgInterest(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-transparent focus:border-accent cursor-pointer"
                    >
                      <option value="Hajj Pilgrimage">Royal Hajj Pilgrimage</option>
                      <option value="Umrah Pilgrimage">Elite/Premium Umrah Tours</option>
                      <option value="Turkey Holiday Package">Turkey Cappadocia Vacations</option>
                      <option value="Dubai Explorer Package">Dubai Opulence Tours</option>
                      <option value="Singapore / Malaysia Vacations">Malaysia & Singapore twins</option>
                      <option value="Bangladesh Domestic Beach">Bangladesh Wilderness (Sajek/Cox's)</option>
                      <option value="General Custom Query">Visa Consultancy & General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Your Detailed Requirements</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe dates, total traveler count, dietary guidelines, standard or luxury hotel preferences..."
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-transparent focus:border-accent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-accent hover:bg-accent-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-2 cursor-pointer cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Secure Inquiry</span>
                </button>

              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
