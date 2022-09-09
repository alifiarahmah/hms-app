import { MethodNotAllowedError } from '@errors/server';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiResponse } from 'next';
import BuildRoute from '@libs/server/nextConnect';
import { IncomingMessage } from 'http';

const PhotoRoute = BuildRoute();
PhotoRoute.post(
  (
    req: IncomingMessage & {
      files: any[];
    },
    res: NextApiResponse
  ) => {
    console.log(req.files);
    res.json(serialize('Upload photo success', req.files));
  }
);

export default PhotoRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
