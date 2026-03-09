const mongoose = require('mongoose');
const User = require('../models/User');

// ─────────────────────────────────────────────
// Helper: validate MongoDB ObjectId
// ─────────────────────────────────────────────
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// ─────────────────────────────────────────────
// POST /users — Create a new user
// ─────────────────────────────────────────────
const createUser = async (req, res) => {
  try {
    const { name, phone, deliveryAddress, plan } = req.body;

    // Basic presence check before hitting Mongoose validation
    if (!name || !phone || !deliveryAddress || !plan) {
      return res.status(400).json({
        success: false,
        message: 'name, phone, deliveryAddress, and plan are all required.',
      });
    }

    const user = await User.create({ name, phone, deliveryAddress, plan });

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: user,
    });
  } catch (err) {
    // Mongoose validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    // Duplicate key (e.g. unique phone)
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ success: false, message: 'A user with this phone number already exists.' });
    }
    console.error('createUser error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// GET /users — Get all users
// ─────────────────────────────────────────────
const getAllUsers = async (req, res) => {
  try {
    // Optional query params: ?plan=basic-veg&isActive=true
    const filter = {};
    if (req.query.plan) filter.plan = req.query.plan;
    if (req.query.isActive !== undefined) filter.isActive = req.query.isActive === 'true';

    const users = await User.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (err) {
    console.error('getAllUsers error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// GET /users/:id — Get a single user by ID
// ─────────────────────────────────────────────
const getUserById = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('getUserById error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// PUT /users/:id — Update a user
// ─────────────────────────────────────────────
const updateUser = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    const allowedFields = ['name', 'phone', 'deliveryAddress', 'plan', 'isActive'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    if (Object.keys(updates).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: 'No valid fields provided for update' });
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,          // return updated document
      runValidators: true, // run schema validators on update
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: user,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: errors.join(', ') });
    }
    console.error('updateUser error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

// ─────────────────────────────────────────────
// DELETE /users/:id — Delete a user
// ─────────────────────────────────────────────
const deleteUser = async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid user ID format' });
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'User deleted successfully',
      data: user,
    });
  } catch (err) {
    console.error('deleteUser error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = { createUser, getAllUsers, getUserById, updateUser, deleteUser };
