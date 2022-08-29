import { NextApiRequest, NextApiResponse } from 'next';

import ErrorHandler from '@libs/server/errorHandler';
import prisma from '@services/prisma';
import { MethodNotAllowedError } from '@errors/server';

const GetPosts = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    throw new MethodNotAllowedError();
  }
});
