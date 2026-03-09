const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [
        /^[6-9]\d{9}$/,
        'Please enter a valid 10-digit Indian mobile number',
      ],
    },
    deliveryAddress: {
      street: {
        type: String,
        required: [true, 'Street address is required'],
        trim: true,
      },
      city: {
        type: String,
        required: [true, 'City is required'],
        trim: true,
      },
      state: {
        type: String,
        default: 'Maharashtra',
        trim: true,
      },
      pincode: {
        type: String,
        required: [true, 'Pincode is required'],
        match: [/^\d{6}$/, 'Please enter a valid 6-digit pincode'],
      },
    },
    plan: {
      type: String,
      required: [true, 'Plan selection is required'],
      enum: {
        values: ['veg-daily', 'trial', 'monthly-veg', 'egg-tiffin', 'chicken-meal'],
        // values: ['basic-veg', 'premium-veg', 'basic-nonveg', 'premium-nonveg'],
        message: 'Plan must be one of: veg-daily, trial, monthly-veg, egg-tiffin, chicken-meal',
      },
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model('User', userSchema);
