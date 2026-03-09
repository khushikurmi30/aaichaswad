const express  = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://aaichaswad:aaichaswad@cluster0.oxszhxq.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('✅ MongoDB connected!'))
  .catch(err => console.error('❌ MongoDB error:', err.message));

const Booking = mongoose.model('Booking', new mongoose.Schema({
  name: String, phone: String, email: String,
  plan: String, street: String, city: String,
  state: String, pincode: String,
}, { timestamps: true }));

app.get('/bookings', async (req, res) => {
  const bookings = await Booking.find().sort({ createdAt: -1 });
  res.json({ count: bookings.length, data: bookings });
});

app.listen(5001, () => console.log('🚀 Running on http://localhost:5001'));
