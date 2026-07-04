const ConsultationModel = require('../models/consultation.model');

// Create a new visa consultation (public)
const createConsultation = async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.id || !payload.name || !payload.email || !payload.country) {
      return res.status(400).json({ success: false, message: 'Missing required consultation parameters.' });
    }

    let consultation;
    if (process.env.MONGO_URI) {
      consultation = await ConsultationModel.create(payload);
    } else {
      // In-memory fallback
      if (!global.__trTravelConsultations) global.__trTravelConsultations = [];
      consultation = { ...payload, createdAt: new Date().toISOString() };
      global.__trTravelConsultations.unshift(consultation);
    }

    return res.status(201).json({ success: true, data: consultation });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to save consultation', error: error.message });
  }
};

// Get all visa consultations (admin only)
const getAllConsultations = async (req, res) => {
  try {
    let consultations;
    if (process.env.MONGO_URI) {
      consultations = await ConsultationModel.find().sort({ createdAt: -1 }).lean();
    } else {
      // In-memory fallback
      consultations = global.__trTravelConsultations || [];
    }
    return res.json({ success: true, data: consultations });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to load consultations', error: error.message });
  }
};

// Update consultation status (admin only)
const updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required.' });
    }

    let updated;
    if (process.env.MONGO_URI) {
      updated = await ConsultationModel.findOneAndUpdate(
        { id: id },
        { status },
        { new: true }
      ).lean();
    } else {
      // In-memory fallback
      const idx = (global.__trTravelConsultations || []).findIndex(c => c.id === id);
      if (idx !== -1) {
        global.__trTravelConsultations[idx].status = status;
        updated = global.__trTravelConsultations[idx];
      }
    }

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Consultation not found.' });
    }

    return res.json({ success: true, data: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to update consultation status', error: error.message });
  }
};

// Delete a consultation (admin only)
const deleteConsultation = async (req, res) => {
  try {
    const { id } = req.params;
    let deleted = false;

    if (process.env.MONGO_URI) {
      const result = await ConsultationModel.findOneAndDelete({ id: id });
      if (result) deleted = true;
    } else {
      // In-memory fallback
      const initialLength = (global.__trTravelConsultations || []).length;
      global.__trTravelConsultations = (global.__trTravelConsultations || []).filter(c => c.id !== id);
      if (global.__trTravelConsultations.length < initialLength) deleted = true;
    }

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Consultation not found.' });
    }

    return res.json({ success: true, message: 'Consultation deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Unable to delete consultation', error: error.message });
  }
};

module.exports = { createConsultation, getAllConsultations, updateConsultationStatus, deleteConsultation };
