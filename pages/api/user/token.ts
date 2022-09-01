import ErrorHandler from '@libs/server/errorHandler';
import { ResType, TokenResType } from '@schemas/response';
import { NextApiRequest, NextApiResponse } from 'next';
import { InternalServerError, MethodNotAllowedError } from '@errors/server';
import prisma from '@services/prisma';
import serialize from '@libs/server/serialize';

const Token = ErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse<ResType<TokenResType>>) => {
    if (req.method !== 'GET') {
      throw new MethodNotAllowedError();
    }
    const userId = req.cookies['userId'];
    if (!userId) throw new InternalServerError();

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        nim: true,
        name: true,
        email: true,
      },
    });

    if (!user) throw new InternalServerError();
    res.status(200).json(serialize('Get token success', user));
  }
);

export default Token;
