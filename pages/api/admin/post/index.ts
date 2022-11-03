import { BadRequestError, MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import { CreateSinglePostSchema, UpdateSinglePostSchema } from '@schemas/request';
import { deleteFile } from '@services/drive';
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
    if (tags.length > 0) {
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
    const { id } = JSON.parse(req.body);
    // check if exists
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!post) throw new BadRequestError('Post not found');

    // delete all images
    for (const image of post.images) {
      await prisma.imagePost.delete({
        where: {
          imageId: image.imageId,
        },
      });

      await prisma.image.delete({
        where: {
          id: image.imageId,
        },
      });
    }

    const oldpost = await prisma.post.delete({
      where: {
        id,
      },
    });
    res.status(200).json(serialize('Delete specific post successful', oldpost));
  } else if (req.method === 'PATCH') {
    const { id, title, content, tags, images } = UpdateSinglePostSchema.parse(req.body);

    // check if exists
    const post = await prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        images: true,
      },
    });

    if (!post) throw new BadRequestError('Post not found');

    // get all old images that is not in the new images
    const oldImages = images
      ? post.images.filter((image) => !images.includes(image.imageId))
      : post.images;

    // delete all old images
    for (const image of oldImages) {
      await prisma.imagePost.delete({
        where: {
          imageId: image.imageId,
        },
      });

      await prisma.image.delete({
        where: {
          id: image.imageId,
        },
      });

      await deleteFile(image.imageId);
    }

    // update post
    const newPost = await prisma.post.update({
      where: {
        id,
      },
      data: {
        title,
        content,
        tags: {
          connect: tags.map((tag) => ({ name: tag })),
        },
      },
    });
    res.status(200).json(serialize('Update specific post successful', newPost));
  } else {
    throw new MethodNotAllowedError();
  }
});

export default Post;
