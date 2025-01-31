import express from 'express';
import {
  addTimeIn,
  addTimeOut,
  getRecords,
  getRecordToday,
} from '../controllers/recordController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', getRecords);
router.post('/', protect, addTimeIn);
router.put('/:id', protect, addTimeOut);
router.get('/today', protect, getRecordToday);

export default router;
