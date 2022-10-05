import { MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const Post = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const posts = await prisma.post.findMany({});
    res.status(200).json(serialize('Get posts successful', posts));
  } else if (req.method === 'POST') {
    const { title, content, tags, images } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
        tags,
        images,
      },
    });
    res.status(200).json(serialize('Create specific post successful', post));
  } else {
    throw new MethodNotAllowedError();
  }
});

export default Post;
