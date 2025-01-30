import express from 'express';
import { getMocks } from '../controllers/mockController.js';

const router = express.Router();

router.get('/', getMocks);

export default router;
