import { MethodNotAllowedError } from '@errors/server';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const Photo = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    const photos = await prisma.image.findMany({});
    res.status(200).json(serialize('Get photo success', photos));
  } else {
    throw new MethodNotAllowedError();
  }
};

export default Photo;
