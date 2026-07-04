const BookingModel = require('../models/booking.model');

// Create a new booking (public)
const createBooking = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.id || !payload.packageName || !payload.customerEmail) {
      return res.status(400).json({ success: false, message: 'Missing required booking parameters.' });
    }

    let booking;
    if (process.env.MONGO_URI) {
      booking = await BookingModel.create(payload);
    } else {
      // In-memory fallback
      if (!global.__trTravelBookings) global.__trTravelBookings = [];
      booking = { ...payload, createdAt: new Date().toISOString() };
      global.__trTravelBookings.unshift(booking);
    }

    return res.status(201).json({ success: true, data: booking });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to save booking', error: error.message });
  }
};

// Get all bookings (admin only)
const getAllBookings = async (req, res) => {
  try {
    let bookings;
    if (process.env.MONGO_URI) {
      bookings = await BookingModel.find().sort({ createdAt: -1 }).lean();
    } else {
      // In-memory fallback
      bookings = global.__trTravelBookings || [];
    }
    return res.json({ success: true, data: bookings });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load bookings', error: error.message });
  }
};

// Update booking status (admin only)
const updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    let updated;
    if (process.env.MONGO_URI) {
      updated = await BookingModel.findOneAndUpdate(
        { id: id },
        { status },
        { new: true }
      ).lean();
    } else {
      // In-memory fallback
      const idx = (global.__trTravelBookings || []).findIndex(b => b.id === id);
      if (idx !== -1) {
        global.__trTravelBookings[idx].status = status;
        updated = global.__trTravelBookings[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update booking status', error: error.message });
  }
};

// Delete a booking (admin only)
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (process.env.MONGO_URI) {
      const result = await BookingModel.findOneAndDelete({ id: id });
      if (result) deleted = true;
    } else {
      // In-memory fallback
      const initialLength = (global.__trTravelBookings || []).length;
      global.__trTravelBookings = (global.__trTravelBookings || []).filter(b => b.id !== id);
      if (global.__trTravelBookings.length < initialLength) deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Booking not found.' });
    }

    return res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete booking', error: error.message });
  }
};

module.exports = { createBooking, getAllBookings, updateBookingStatus, deleteBooking };
