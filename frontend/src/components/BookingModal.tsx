/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { X, Calendar, Users, Briefcase, Mail, Phone, CreditCard, ShieldCheck, Ticket, Download, Printer } from 'lucide-react';
import { Booking } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  packageName?: string;
  packageType?: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom';
  basePrice?: number;
  onAddBooking: (booking: Booking) => void;
}

export default function BookingModal({
  isOpen,
  onClose,
  packageName = 'Custom Tailored Tour Package',
  packageType = 'custom',
  basePrice = 500,
  onAddBooking
}: BookingModalProps) {
  const [step, setStep] = useState(1);
  
  // State variables for form
  const [travelDate, setTravelDate] = useState('2026-07-20');
  const [travelersCount, setTravelersCount] = useState(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [visaCountry, setVisaCountry] = useState('Saudi Arabia');
  
  // Promo / Coupon
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // in dollars
  const [promoMessage, setPromoMessage] = useState('');

  // Payment mock states
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVV, setCardCVV] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalBookingObj, setFinalBookingObj] = useState<Booking | null>(null);

  // Initialize form values if props change
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setAppliedDiscount(0);
      setPromoCode('');
      setPromoMessage('');
      setCardNumber('');
      setCardExpiry('');
      setCardCVV('');
      setIsProcessing(false);
      setFinalBookingObj(null);
    }
  }, [isOpen, packageName]);

  if (!isOpen) return null;

  // Real-time calculations
  const subTotal = basePrice * travelersCount;
  const vatAmount = Math.round(subTotal * 0.05); // 5% VAT
  const discountTotal = appliedDiscount;
  const ultimatePrice = subTotal + vatAmount - discountTotal;

  const handleApplyPromo = () => {
    const code = promoCode.toUpperCase().trim();
    if (code === 'TRTRAVEL10') {
      const discount = Math.round(subTotal * 0.10);
      setAppliedDiscount(discount);
      setPromoMessage('🎉 "TRTRAVEL10" Applied! 10% Discount deducted.');
    } else if (code === 'BISMILLAH') {
      setAppliedDiscount(150);
      setPromoMessage('🎉 Pilgrimage Coupon Accepted! $150 reduction.');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('❌ Invalid coupon code.');
    }
  };

  const handleNextStep = () => {
    if (step === 2) {
      if (!customerName || !customerEmail || !customerPhone) {
        alert('Kindly provide your Name, Email, and Phone so we can authenticate your seat.');
        return;
      }
    }
    setStep((prev) => prev + 1);
  };

  const handlePrevStep = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleExecutePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber || !cardExpiry || !cardCVV) {
      alert('Kindly fill out your Checkout details to settle account.');
      return;
    }

    setIsProcessing(true);

    // Simulate merchant processing
    setTimeout(() => {
      const refCode = `TRB-${Math.floor(10000 + Math.random() * 90000)}-${packageType.substring(0, 2).toUpperCase()}`;
      
      const newBooking: Booking = {
        id: refCode,
        packageName,
        packageType,
        customerName,
        customerEmail,
        customerPhone,
        travelDate,
        travelersCount,
        totalPrice: ultimatePrice,
        status: 'Confirmed',
        bookingDate: new Date().toLocaleDateString('en-US'),
        specialRequests,
        visaCountry
      };

      onAddBooking(newBooking);
      setFinalBookingObj(newBooking);
      setIsProcessing(false);
      setStep(4);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-dark/70 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-150 animate-scale-up">
        
        {/* Header bar */}
        <div className="bg-dark text-white px-6 sm:px-8 py-5 flex justify-between items-center relative">
          <div>
            <span className="text-accent text-[10px] font-bold tracking-widest uppercase block mb-0.5">
              Secure Booking Gateway
            </span>
            <h4 className="font-display font-bold text-lg text-white">TR Travel Checkout</h4>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 bg-white/10 hover:bg-white text-white hover:text-dark rounded-full transition-all cursor-pointer"
            aria-label="Close Checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        {step < 4 && (
          <div className="bg-secondary/40 px-8 py-3.5 border-b border-gray-150 flex items-center justify-between text-xs font-semibold text-gray-400 font-sans">
            <span className={step === 1 ? 'text-accent font-bold' : 'text-dark'}>1. Details</span>
            <span className="text-gray-300">➔</span>
            <span className={step === 2 ? 'text-accent font-bold' : step > 2 ? 'text-dark' : ''}>2. Traveler Info</span>
            <span className="text-gray-300">➔</span>
            <span className={step === 3 ? 'text-accent font-bold' : ''}>3. Payment Settle</span>
          </div>
        )}

        {/* Step Content Panels */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: JOURNEY CONFIG */}
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="bg-secondary p-4.5 rounded-xl border border-gray-150">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block mb-0.5">Selected Class / Package:</span>
                <div className="font-sans font-bold text-sm text-dark">{packageName}</div>
                <div className="text-xs text-accent mt-1.5 font-bold">Base Price per seat: ${basePrice} USD</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Preferred travel date</label>
                  <div className="flex items-center space-x-2 bg-secondary rounded-xl p-3 border border-gray-100">
                    <Calendar className="w-4 h-4 text-accent" />
                    <input
                      type="date"
                      value={travelDate}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className="w-full text-xs font-semibold bg-transparent focus:outline-none text-dark cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Traveler Seats Count</label>
                  <div className="flex items-center space-x-2 bg-secondary rounded-xl p-3 border border-gray-100">
                    <Users className="w-4 h-4 text-accent" />
                    <select
                      value={travelersCount}
                      onChange={(e) => setTravelersCount(Number(e.target.value))}
                      className="w-full text-xs font-semibold bg-transparent focus:outline-none text-dark cursor-pointer"
                    >
                      <option value={1}>1 Person</option>
                      <option value={2}>2 Persons</option>
                      <option value={3}>3 Persons</option>
                      <option value={4}>4 Persons</option>
                      <option value={5}>Family Suite (5 Persons)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Promo Coupon Module */}
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-xl space-y-2">
                <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">Promo Code coupon</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Try 'TRTRAVEL10' or 'BISMILLAH'"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="bg-white text-dark text-xs p-2.5 rounded-lg border border-gray-150 flex-1 uppercase"
                  />
                  <button
                    type="button"
                    onClick={handleApplyPromo}
                    className="bg-dark text-white px-4 py-2 rounded-lg text-xs font-bold uppercase transition-colors hover:bg-opacity-95 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <div className="text-[10px] font-bold text-accent">{promoMessage}</div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                <span className="text-xs text-text-light font-medium">
                  Sub-total: <strong className="text-dark text-sm font-sans">${subTotal}</strong>
                </span>
                
                <button
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-accent hover:bg-accent-dark text-white text-xs font-bold tracking-widest uppercase rounded-xl transition-all shadow-sm cursor-pointer"
                >
                  Confirm Details
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: USER DETAILS */}
          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h5 className="font-sans font-bold text-dark text-sm border-b pb-1.5 mb-4 uppercase tracking-wide">Primary Traveler Information</h5>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Contact Name (As in Passport)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Al-Haj Tazul Islam"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl border border-gray-100 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Direct Email Desk</label>
                    <div className="flex items-center space-x-2 bg-secondary p-3 rounded-xl border border-gray-100">
                      <Mail className="w-4 h-4 text-accent shrink-0" />
                      <input
                        type="email"
                        required
                        placeholder="tazul@gmail.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full text-xs bg-transparent focus:outline-none text-dark"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Telephone Connection</label>
                    <div className="flex items-center space-x-2 bg-secondary p-3 rounded-xl border border-gray-100">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <input
                        type="tel"
                        required
                        placeholder="+880 1712-345678"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full text-xs bg-transparent focus:outline-none text-dark"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase mb-2">Special Guidelines Requests (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Dietary limits, wheel chair requirements, extra beds needed, etc..."
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl border border-gray-100 focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* Navigation triggers */}
              <div className="flex justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-dark text-xs font-bold tracking-wider uppercase rounded-xl cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2.5 bg-accent hover:bg-accent-dark text-white text-xs font-bold tracking-widest uppercase rounded-xl shadow-sm cursor-pointer"
                >
                  Continue Checkout
                </button>
              </div>

            </div>
          )}

          {/* STEP 3: SUMMARY & SECURE PAYMENT */}
          {step === 3 && (
            <div className="space-y-6 animate-fade-in">
              {/* Payment Summary */}
              <div className="bg-secondary p-5 rounded-xl border border-gray-150 space-y-2.5">
                <h5 className="font-sans font-bold text-xs text-dark uppercase tracking-widest mb-2 flex items-center justify-between border-b pb-1">
                  <span>Bill Invoice summary</span>
                  <span className="text-[10px] text-accent lowercase">USD conversion rates</span>
                </h5>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Base Cost (${basePrice} × {travelersCount} passengers):</span>
                  <span>${subTotal}</span>
                </div>
                
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Local Airport Taxes & CAAB VAT (5%):</span>
                  <span>+${vatAmount}</span>
                </div>

                {appliedDiscount > 0 && (
                  <div className="flex justify-between text-xs text-emerald-600 font-semibold bg-emerald-50 p-1 rounded">
                    <span>Coupon Discount (Reduction):</span>
                    <span>-${discountTotal}</span>
                  </div>
                )}

                <div className="flex justify-between border-t border-gray-150 pt-2.5 font-bold text-dark text-sm">
                  <span>Total Payable Price:</span>
                  <span className="text-accent text-base font-sans">${ultimatePrice} USD</span>
                </div>
              </div>

              {/* Secure simulated merchant card inputs */}
              <form onSubmit={handleExecutePayment} className="space-y-4">
                <h6 className="font-sans font-bold text-xs uppercase tracking-wider text-dark block">Enter Mock Payment Details:</h6>
                
                <div>
                  <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Card Number (Safe Simulated Portal)</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="4000 1234 5678 9010"
                      maxLength={19}
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 pl-11 rounded-xl border border-gray-100"
                    />
                    <CreditCard className="w-4 h-4 text-gray-400 absolute left-4 top-[14px]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      maxLength={5}
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl border border-gray-100 text-center"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold text-gray-400 uppercase mb-1">CVV / Security Code</label>
                    <input
                      type="password"
                      required
                      placeholder="•••"
                      maxLength={3}
                      value={cardCVV}
                      onChange={(e) => setCardCVV(e.target.value)}
                      className="w-full bg-secondary text-dark text-xs p-3.5 rounded-xl border border-gray-100 text-center"
                    />
                  </div>
                </div>

                {isProcessing ? (
                  <div className="bg-secondary p-4 rounded-xl text-center text-xs font-semibold text-dark space-y-2 animate-pulse">
                    <span>📡 Securely communicating with CAAB gateways...</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="py-3.5 bg-neutral-100 hover:bg-neutral-200 text-dark text-xs font-bold uppercase tracking-wider rounded-xl cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      className="py-3.5 bg-accent hover:bg-accent-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-lg transition-transform hover:-translate-y-0.5"
                    >
                      Pay ${ultimatePrice} USD
                    </button>
                  </div>
                )}
              </form>

              <div className="text-[10px] text-gray-400 text-center flex items-center justify-center space-x-1 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                <span>PCI-Compliant SSL encrypted transaction channel verified</span>
              </div>
            </div>
          )}

          {/* STEP 4: BEAUTIFUL SUCCESS TICKET MOCKUP */}
          {step === 4 && finalBookingObj && (
            <div className="space-y-6 animate-scale-up py-4">
              
              {/* Green Success header */}
              <div className="text-center space-y-2 mb-4">
                <span className="text-4xl block animate-bounce">✈</span>
                <h5 className="font-display font-medium text-2xl text-emerald-700">Journey Confirmed!</h5>
                <p className="text-xs text-text-light max-w-sm mx-auto">
                  Your premium travel seat has been securely dispatched. Thank you for choosing TR Travel.
                </p>
              </div>

              {/* Physical ticket visual simulation */}
              <div className="bg-zinc-950 text-white rounded-2xl p-6 relative border border-zinc-805 font-mono shadow-2xl">
                
                {/* Visual side notches representing cinema ticket notches */}
                <div className="absolute top-[120px] -left-3 w-6 h-6 bg-white rounded-full z-10" />
                <div className="absolute top-[120px] -right-3 w-6 h-6 bg-white rounded-full z-10" />

                <div className="border-b border-dashed border-zinc-800 pb-4 mb-4 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-accent uppercase text-[9px] font-bold block mb-0.5">Booking ID Reference</span>
                    <strong className="text-white text-sm tracking-widest">{finalBookingObj.id}</strong>
                  </div>
                  
                  <span className="bg-green-900/40 text-green-400 border border-green-500/30 font-bold px-2 py-0.5 rounded text-[10px] tracking-widest uppercase">
                    ISSUED
                  </span>
                </div>

                <div className="space-y-3.5 text-[11px] pb-4 mb-4 border-b border-dashed border-zinc-850">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TRAVELER NAME:</span>
                    <span className="text-white font-sans font-bold">{finalBookingObj.customerName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">PACKAGE SELECTED:</span>
                    <span className="text-accent font-sans font-bold max-w-[180px] text-right truncate">{finalBookingObj.packageName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TRAVEL RUN DATE:</span>
                    <span className="text-white">{finalBookingObj.travelDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TOTAL OCCUPANTS:</span>
                    <span className="text-white">{finalBookingObj.travelersCount} Adult Passenger(s)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">TOTAL FARE SETTLED:</span>
                    <span className="text-green-400 font-sans font-bold text-sm">${finalBookingObj.totalPrice} USD</span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[10px] text-zinc-500 leading-snug">
                  <div>
                    <div className="mb-0.5 font-bold uppercase text-zinc-400">TR Travel Dhaka Counter</div>
                    <div>Status: Verified by CAAB Desk</div>
                  </div>
                  
                  <Ticket className="w-7 h-7 text-accent opacity-50" />
                </div>

              </div>

              {/* Actions on ticket success */}
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => alert('Printing invoice context dispatched to desktop print drivers.')}
                  className="px-5 py-3 hover:bg-neutral-100 text-dark border border-gray-205 text-xs font-bold uppercase rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert('Official digital voucher PDF generated and downloaded to your files container.');
                    onClose();
                  }}
                  className="px-6 py-3 bg-dark hover:bg-neutral-900 border border-transparent text-white text-xs font-bold uppercase rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer flex-1"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Voucher PDF</span>
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
