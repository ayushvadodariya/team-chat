import { db } from '../db.js';

export const getChannelMessages = async (req, res) => {
  try {
    const { channelId } = req.params;
    const { cursor, limit = 20 } = req.query;

    const take = Number(limit);

    const queryOptions = {
      take,
      where: {
        channelId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    };

    if (cursor) {
      queryOptions.where.createdAt = {
        lt: new Date(cursor),
      };
    }

    const messages = await db.message.findMany(queryOptions);

    let nextCursor = null;
    if (messages.length === take) {
      nextCursor = messages[messages.length - 1].createdAt;
    }

    res.json({
      items: messages,
      nextCursor,
    });
  } catch (error) {
    console.error('Get channel messages error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
