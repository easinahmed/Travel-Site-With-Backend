const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true
    },
    packageId: {
      type: String
    },
    packageName: {
      type: String,
      required: true
    },
    packageType: {
      type: String,
      required: true,
      enum: ['tour', 'hajj', 'umrah', 'visa', 'custom']
    },
    customerName: {
      type: String,
      required: true
    },
    customerEmail: {
      type: String,
      required: true
    },
    customerPhone: {
      type: String,
      required: true
    },
    travelDate: {
      type: String,
      required: true
    },
    travelersCount: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: 'Confirmed', // matches front-end confirm simulation default
      enum: ['Pending', 'Confirmed']
    },
    bookingDate: {
      type: String,
      required: true
    },
    specialRequests: {
      type: String
    },
    visaCountry: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Booking', bookingSchema);
