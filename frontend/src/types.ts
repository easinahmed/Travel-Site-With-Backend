/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Destination {
  id: string;
  name: string;
  country: string;
  rating: number;
  image: string;
  description: string;
  attractionsCount: number;
  averagePrice: number;
}

export interface Package {
  id: string;
  name: string;
  type: 'tour' | 'hajj' | 'umrah' | 'holiday';
  destination: string;
  description: string;
  price: number;
  duration: string; // e.g., "7 Days, 6 Nights"
  image: string;
  rating: number;
  reviewsCount: number;
  inclusions: string[];
  itinerary: string[];
  hotels: string[];
  spots: string[];
  isFeatured: boolean;
}

export interface HajjUmrahPackage {
  id: string;
  name: string;
  category: 'Hajj' | 'Umrah';
  tier: 'Standard' | 'Premium' | 'Luxury';
  price: number;
  duration: string;
  makkahHotel: string;
  makkahHotelRating: number;
  madinahHotel: string;
  madinahHotelRating: number;
  distanceToHaram: string; // e.g., "150 meters"
  transportation: string; // e.g., "Private GMC / Luxury Bus"
  inclusions: string[];
  features: string[];
  registrationDeadline: string;
  itinerary: string[];
}

export interface VisaInfo {
  id: string;
  country: string;
  flag: string;
  subtitle: string;
  processingTime: string;
  validity: string;
  fee: number;
  requirements: string[]; // brief points
  requiredDocuments: string[]; // detailed items
  explanation: string;
}

export interface Booking {
  id: string;
  packageId?: string;
  packageName: string;
  packageType: 'tour' | 'hajj' | 'umrah' | 'visa' | 'custom';
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDate: string;
  travelersCount: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed';
  bookingDate: string;
  specialRequests?: string;
  visaCountry?: string;
}

export interface VisaConsultation {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  date: string;
  timeSlot: string;
  notes?: string;
  status: 'Scheduled' | 'Pending';
  createdAt: string;
}
