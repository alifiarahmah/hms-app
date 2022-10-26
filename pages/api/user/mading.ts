import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';

const Mading = ErrorHandler(async (req, res) => {
  if (req.method === 'GET') {
    // get image where dont have image post
    const mading = await prisma.image.findMany({
      include: {
        ImagePost: true,
        tags: true,
      },
    });
    res.status(200).json(
      serialize(
        'Get Madings successful',
        mading.filter((m) => m.ImagePost.length === 0)
      )
    );
  }
});

export default Mading;
