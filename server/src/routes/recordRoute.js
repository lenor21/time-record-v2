import express from 'express';
import {
  addTimeIn,
  addTimeOut,
  getRecords,
} from '../controllers/recordController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getRecords);
router.post('/', protect, addTimeIn);
router.put('/:id', protect, addTimeOut);

export default router;
