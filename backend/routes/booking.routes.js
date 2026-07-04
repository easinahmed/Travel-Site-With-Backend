const express = require('express');
const { createBooking, getAllBookings, updateBookingStatus, deleteBooking } = require('../controllers/booking.controllers');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public route to book a package
router.post('/', createBooking);

// Protected routes for administrator management
router.get('/', authMiddleware, getAllBookings);
router.put('/:id', authMiddleware, updateBookingStatus);
router.delete('/:id', authMiddleware, deleteBooking);

module.exports = router;
