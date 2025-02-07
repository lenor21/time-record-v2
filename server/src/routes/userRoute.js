import express from 'express';
import {
  addUser,
  deleteUser,
  getUserProfile,
  getUsers,
  loginUser,
  logoutUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', protect, getUsers);
router.post('/', addUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/profile', protect, getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;
