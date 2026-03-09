const express = require('express');
const router = express.Router();
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

// POST   /users       → Create a new user
router.post('/', createUser);

// GET    /users       → Get all users
router.get('/', getAllUsers);

// GET    /users/:id   → Get a single user by ID
router.get('/:id', getUserById);

// PUT    /users/:id   → Update a user
router.put('/:id', updateUser);

// DELETE /users/:id   → Delete a user
router.delete('/:id', deleteUser);

module.exports = router;
