import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';

const Post = ErrorHandler(async (req, res) => {
  if (req.method === 'GET') {
    const { slug } = req.query;
    if (slug) {
      if (slug[0] === 'id') {
        const posts = await prisma.post.findUnique({
          where: {
            id: slug[1],
          },
          include: {
            images: true,
            tags: true,
          },
        });
        res.status(200).json(serialize('Get post successful', posts));
      } else if (slug[0] === 'tag') {
        const posts = await prisma.post.findMany({
          where: {
            tags: {
              some: {
                name: slug[1],
              },
            },
          },
          include: {
            images: true,
            tags: true,
          },
					orderBy: {
						createdAt: 'desc',
					},
        });
        res.status(200).json(serialize('Get posts successful', posts));
      }
    }
  }
});

export default Post;
