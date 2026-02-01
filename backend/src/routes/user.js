const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  changePassword,
  deleteAccount,
  getAllUsers,
  updateUserRole,
  deleteUser,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const {
  validateProfileUpdate,
  validatePasswordChange,
} = require('../middleware/validator');
const { strictLimiter } = require('../middleware/rateLimiter');

// User routes (authenticated)
router.get('/profile', protect, getProfile);
router.put('/profile', protect, validateProfileUpdate, updateProfile);
router.put('/change-password', protect, strictLimiter, validatePasswordChange, changePassword);
router.delete('/profile', protect, strictLimiter, deleteAccount);

// Admin routes
router.get('/', protect, authorize('admin', 'moderator'), getAllUsers);
router.put('/:id/role', protect, authorize('admin'), updateUserRole);
router.delete('/:id', protect, authorize('admin'), strictLimiter, deleteUser);

module.exports = router;
