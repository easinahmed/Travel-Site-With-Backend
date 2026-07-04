import { VisaConsultation } from '../types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

export async function createConsultation(consultation: Omit<VisaConsultation, 'id' | 'createdAt' | 'status'> & { id: string; createdAtDate: string }) {
  try {
    const response = await fetch(`${API_URL}/visa-consultations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(consultation)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to request consultation');
    return result.data;
  } catch (error) {
    console.error('Consultation submission error:', error);
    throw error;
  }
}

export async function fetchConsultations(token: string) {
  try {
    const response = await fetch(`${API_URL}/visa-consultations`, {
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to load consultations');
    // Map fields back to frontend structure if necessary
    const mapped = result.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      email: item.email,
      phone: item.phone,
      country: item.country,
      date: item.date,
      timeSlot: item.timeSlot,
      notes: item.notes,
      status: item.status,
      createdAt: item.createdAtDate || new Date(item.createdAt).toLocaleDateString('en-US')
    }));
    return mapped;
  } catch (error) {
    console.error('Fetch consultations error:', error);
    return [];
  }
}

export async function updateConsultationStatus(id: string, status: 'Scheduled' | 'Pending', token: string) {
  try {
    const response = await fetch(`${API_URL}/visa-consultations/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to update consultation status');
    return result.data;
  } catch (error) {
    console.error('Update consultation status error:', error);
    throw error;
  }
}

export async function deleteConsultation(id: string, token: string) {
  try {
    const response = await fetch(`${API_URL}/visa-consultations/${id}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}` 
      }
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Failed to delete consultation');
    return true;
  } catch (error) {
    console.error('Delete consultation error:', error);
    throw error;
  }
}
