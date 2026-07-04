import { Booking } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function createBooking(booking: Booking) {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to submit booking');
    return result.data;
  } catch (error) {
    console.error('Booking submission error:', error);
    throw error;
  }
}

export async function fetchBookings(token: string) {
  try {
    const response = await fetch(`${API_URL}/bookings`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to load bookings');
    return result.data;
  } catch (error) {
    console.error('Fetch bookings error:', error);
    return [];
  }
}

export async function updateBookingStatus(id: string, status: 'Pending' | 'Confirmed', token: string) {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update booking status');
    return result.data;
  } catch (error) {
    console.error('Update booking status error:', error);
    throw error;
  }
}

export async function deleteBooking(id: string, token: string) {
  try {
    const response = await fetch(`${API_URL}/bookings/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete booking');
    return true;
  } catch (error) {
    console.error('Delete booking error:', error);
    throw error;
  }
}
