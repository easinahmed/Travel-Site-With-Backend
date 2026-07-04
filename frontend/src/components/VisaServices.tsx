/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Landmark, Compass, HelpCircle, FileText, CheckCircle, Calendar, Clock, DollarSign, ArrowRight } from 'lucide-react';
import { VISA_SERVICES } from '../data/travelData';
import { VisaInfo, VisaConsultation } from '../types';

interface VisaServicesProps {
  onAddVisaConsultation: (consultation: Omit<VisaConsultation, 'id' | 'createdAt' | 'status'>) => void;
  visaConsultations: VisaConsultation[];
  content?: any[];
}

export default function VisaServices({ onAddVisaConsultation, visaConsultations, content }: VisaServicesProps) {
  const [selectedCountryId, setSelectedCountryId] = useState<string>('visa-saudi');
  
  // Consultation booking local form state
  const [personName, setPersonName] = useState('');
  const [personEmail, setPersonEmail] = useState('');
  const [personPhone, setPersonPhone] = useState('');
  const [selectedDate, setSelectedDate] = useState('2026-06-25');
  const [selectedSlot, setSelectedSlot] = useState('11:00 AM - 11:30 AM');
  const [consultNotes, setConsultNotes] = useState('');
  const [isSuccessMessage, setIsSuccessMessage] = useState(false);

  const visaItems = (content?.length ? content : VISA_SERVICES) as any[];
  const activeVisaInfo = visaItems.find((v: any) => v.id === selectedCountryId) || visaItems[0];

  const handleConsultSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!personName || !personEmail || !personPhone) {
      alert('Kindly fill out your Name, Email, and Phone for the consultation.');
      return;
    }

    onAddVisaConsultation({
      name: personName,
      email: personEmail,
      phone: personPhone,
      country: activeVisaInfo.country,
      date: selectedDate,
      timeSlot: selectedSlot,
      notes: consultNotes
    });

    setIsSuccessMessage(true);
    // clean state
    setPersonName('');
    setPersonEmail('');
    setPersonPhone('');
    setConsultNotes('');

    // Clear message after 6 seconds
    setTimeout(() => {
      setIsSuccessMessage(false);
    }, 6000);
  };

  return (
    <section id="visa-services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent text-xs font-bold tracking-widest uppercase block mb-3">Hassle-Free Processing</span>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-dark mb-4">
            Official Visa Consultation Services
          </h2>
          <p className="font-sans text-sm text-text-light leading-relaxed">
            Skip complex embassy lines. TR Travel is an authorized digital visa agent providing high-success verification for your international journeys.
          </p>
          <div className="h-0.5 w-16 bg-accent mx-auto mt-4 rounded"></div>
        </div>

        {/* Dynamic Country Selector Grid */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {visaItems.map((visa: any) => (
            <button
              key={visa.id}
              onClick={() => {
                setSelectedCountryId(visa.id);
                setIsSuccessMessage(false);
              }}
              className={`px-5 py-3 rounded-xl text-xs font-bold font-sans tracking-wide transition-all uppercase flex items-center space-x-2 border cursor-pointer ${
                selectedCountryId === visa.id
                  ? 'bg-accent/10 border-accent/60 text-accent '
                  : 'bg-secondary hover:bg-gray-150 text-text-light border-gray-150'
              }`}
            >
              <span className="text-base">{visa.flag}</span>
              <span>{visa.country}</span>
            </button>
          ))}
        </div>

        {/* Selected Country Deep Details / Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-secondary/70 border border-gray-150/40 p-6 sm:p-10 rounded-3xl">
          
          {/* Left Column: Documentation, processing metrics */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-3xl">{activeVisaInfo.flag}</span>
                <div>
                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark">{activeVisaInfo.country} Visa Assistance</h3>
                  <span className="text-xs text-text-light font-medium">{activeVisaInfo.subtitle}</span>
                </div>
              </div>
              <p className="font-sans text-xs text-text-light mt-3 leading-relaxed">
                {activeVisaInfo.explanation}
              </p>
            </div>

            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
                <span className="flex items-center text-accent text-[10px] font-bold tracking-widest uppercase mb-1">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  Processing Time
                </span>
                <span className="font-sans font-bold text-xs text-dark">{activeVisaInfo.processingTime}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
                <span className="flex items-center text-accent text-[10px] font-bold tracking-widest uppercase mb-1">
                  <CheckCircle className="w-3.5 h-3.5 mr-1" />
                  Validity Era
                </span>
                <span className="font-sans font-bold text-xs text-dark">{activeVisaInfo.validity}</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-2xs">
                <span className="flex items-center text-accent text-[10px] font-bold tracking-widest uppercase mb-1">
                  <DollarSign className="w-3.5 h-3.5 mr-1" />
                  Govt/Agent Fee
                </span>
                <span className="font-sans font-bold text-xs text-dark">${activeVisaInfo.fee} <span className="text-[10px] text-gray-400 font-medium">(inclusive)</span></span>
              </div>

            </div>

            {/* Required Documents Detailed Section */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150">
              <h4 className="font-sans font-bold text-sm text-dark mb-4 flex items-center space-x-2 border-b pb-2 uppercase tracking-wide">
                <FileText className="w-4 h-4 text-accent" />
                <span>Mandatory Supporting Documents Required</span>
              </h4>
              
              <ul className="space-y-3">
                {(activeVisaInfo.requiredDocuments || []).map((doc: string, idx: number) => (
                  <li key={idx} className="flex items-start text-xs text-text-light font-sans leading-relaxed">
                    <span className="mr-2 text-accent mt-0.5">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 bg-amber-50 rounded-xl p-4 border border-amber-100 text-[11px] text-amber-900 leading-relaxed">
                👉 <strong>Consular Note:</strong> Double checking certified bank ledger seals and NOC certificate dates prevents 98% of potential rejections. Our team handles physical document review in Dhaka.
              </div>
            </div>

          </div>

          {/* Right Column: Online Consultation Booking Form */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-2xl border border-gray-150/70 shadow-sm">
            
            <div className="mb-6">
              <h4 className="font-sans font-bold text-base text-dark mb-1">Free Visa Consultation</h4>
              <p className="font-sans text-xs text-text-light">
                Schedule a 1-on-1 virtual call with our visa specialists in Bangladesh.
              </p>
            </div>

            {isSuccessMessage ? (
              <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-center space-y-4 py-8 animate-fade-in">
                <span className="text-3xl block">📆</span>
                <h5 className="font-sans font-bold text-emerald-800 text-sm">Consultation Registered!</h5>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  We have secured your online desk consultation for <strong>{activeVisaInfo.country}</strong> on: 
                  <span className="block font-bold mt-1.5">{selectedDate} at {selectedSlot}</span>
                </p>
                <div className="text-[10px] text-emerald-600 bg-white/50 border border-emerald-100/50 p-2.5 rounded-lg">
                  A verification calendar invite representing video call coordinates has been dispatched to your designated email.
                </div>
              </div>
            ) : (
              <form onSubmit={handleConsultSubmit} className="space-y-4">
                
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Your structural name"
                    value={personName}
                    onChange={(e) => setPersonName(e.target.value)}
                    className="w-full bg-secondary text-dark text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-gray-100"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="name@gmail.com"
                      value={personEmail}
                      onChange={(e) => setPersonEmail(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">Phone Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 171..."
                      value={personPhone}
                      onChange={(e) => setPersonPhone(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-gray-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      required
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-gray-100 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">Preferred Slot</label>
                    <select
                      value={selectedSlot}
                      onChange={(e) => setSelectedSlot(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-gray-100 cursor-pointer text-left"
                    >
                      <option value="10:00 AM - 10:30 AM">10:00 AM - 10:30 AM</option>
                      <option value="11:00 AM - 11:30 AM">11:00 AM - 11:30 AM</option>
                      <option value="02:00 PM - 02:30 PM">02:00 PM - 02:30 PM</option>
                      <option value="04:00 PM - 04:30 PM">04:00 PM - 04:30 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-1.5">Additional Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Specify previous visa refusals or travel history if any..."
                    value={consultNotes}
                    onChange={(e) => setConsultNotes(e.target.value)}
                    className="w-full bg-secondary text-dark text-xs p-3 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent border border-gray-100 resize-none animate-fade-in"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-dark hover:bg-opacity-95 text-white font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-md cursor-pointer transition-transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center space-x-1.5"
                >
                  <Calendar className="w-4 h-4 text-accent" />
                  <span>Reserve Consultation</span>
                </button>

              </form>
            )}

            {/* Existing Scheduled Consultations Display */}
            {visaConsultations.length > 0 && (
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="block text-[10px] font-bold tracking-widest text-accent uppercase mb-2">Active Scheduled Chats ({visaConsultations.length})</span>
                <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                  {visaConsultations.map((c) => (
                    <div key={c.id} className="bg-gray-50 border border-gray-100 rounded-lg p-2.5 text-[10px] flex justify-between items-center">
                      <div>
                        <div className="font-bold text-dark">{c.name} ({c.country})</div>
                        <div className="text-gray-400">{c.date} • {c.timeSlot}</div>
                      </div>
                      <span className="bg-emerald-50 text-emerald-700 text-[9px] font-bold uppercase px-2 py-0.5 rounded border border-emerald-100">Confirmed</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
