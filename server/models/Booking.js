const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  place: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Place',
  },
  checkIn: Date,
  checkOut: Date,
  noOfGuests: Number,
  name: String,
  email: String,
  phone: String,
  price: Number,
})

const BookingModel = mongoose.model('Booking', BookingSchema)

module.exports = BookingModel
