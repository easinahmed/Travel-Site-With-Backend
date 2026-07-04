const express = require('express');
const { createConsultation, getAllConsultations, updateConsultationStatus, deleteConsultation } = require('../controllers/consultation.controllers');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Public route to request a consultation
router.post('/', createConsultation);

// Protected routes for administrator management
router.get('/', authMiddleware, getAllConsultations);
router.put('/:id', authMiddleware, updateConsultationStatus);
router.delete('/:id', authMiddleware, deleteConsultation);

module.exports = router;
