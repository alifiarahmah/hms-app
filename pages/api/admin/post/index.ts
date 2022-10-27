import { BadRequestError, MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import { CreateSinglePostSchema } from '@schemas/request';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const Post = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({});
    res.status(200).json(serialize('Get posts successful', posts));
  } else if (req.method === 'POST') {
    const { title, content, tags, images } = CreateSinglePostSchema.parse(req.body);

    if (tags) {
      // Check if tags already available
      const tagsData = await prisma.tag.findMany({});

      // throw an error if tags unavailable
      for (const tag of tags) {
        if (!tagsData.find((t) => t.name === tag)) {
          throw new BadRequestError(`Tag ${tag} is not available`);
        }
      }
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });

    // Connect tags to post
    if (tags) {
      await prisma.post.update({
        where: {
          id: post.id,
        },
        data: {
          tags: {
            connect: tags.map((tag) => ({ name: tag })),
          },
        },
      });
    }

    // Connect images to post
    if (images) {
      // Create ImagePost
      const imagePosts = await prisma.imagePost.createMany({
        data: images.map((image) => ({
          imageId: image,
          postId: post.id,
        })),
      });
    }

    res.status(200).json(serialize('Create specific post successful', post));
  } else if (req.method === 'DELETE') {
    const { id } = req.body;
    // check if exists
    let post = await prisma.post.findFirst({
      where: {
        id,
      },
    });

    if (!post) throw new BadRequestError('Post not found');

    post = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(200).json(serialize('Delete specific post successful', post));
  } else {
    throw new MethodNotAllowedError();
  }
});

export default Post;
