import express from 'express';
import {
  createChannel,
  getAllChannels,
} from '../controllers/channelController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/', getAllChannels);
router.post('/', createChannel);

export default router;
