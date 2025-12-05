import { db } from '../db.js';

export const createChannel = async (req, res) => {
  try {
    const { name } = req.body;
    const userId = req.user.userId;

    const channel = await db.channel.create({
      data: {
        name,
        creatorId: userId,
        members: {
          create: {
            userId: userId,
          },
        },
      },
    });

    res.status(201).json(channel);
  } catch (error) {
    console.error('Create channel error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllChannels = async (req, res) => {
  try {
    const channels = await db.channel.findMany({
      include: {
        _count: {
          select: { members: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    res.json(channels);
  } catch (error) {
    console.error('Get all channels error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};