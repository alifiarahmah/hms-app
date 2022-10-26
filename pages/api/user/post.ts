import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';

const Post = ErrorHandler(async (req, res) => {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({
      include: {
        images: true,
      },
    });
    res.status(200).json(serialize('Get posts successful', posts));
  }
});

export default Post;
