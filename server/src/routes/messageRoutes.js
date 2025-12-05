import express from 'express';
import { getChannelMessages } from '../controllers/messageController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);

router.get('/:channelId', getChannelMessages);

export default router;
