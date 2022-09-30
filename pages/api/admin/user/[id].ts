import { BadRequestError, MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import {
  CreateSingleUserSchema,
  PatchSingleUserReqType,
  PatchSingleUserSchema,
} from '@schemas/request';

const SpecificUser = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    if (typeof id !== 'string') {
      throw new BadRequestError('Id must be a string');
    }
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new BadRequestError('Invalid user id');
    }
    res.status(200).json(serialize('Get specific user successful', user));
  } else if (req.method === 'PATCH') {
    const { id } = req.query;
    if (typeof id !== 'string') {
      throw new BadRequestError('Id must be a string');
    }

    const { name, email, password: unhashed } = PatchSingleUserSchema.parse(req.body);
    const data: PatchSingleUserReqType = { name, email };
    if (unhashed) {
      const password = bcrypt.hashSync(unhashed, parseInt(process.env.BCRYPT_SALT_ROUNDS));
      data.password = password;
    }
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    res.status(200).json(serialize('Update specific user successful', user));
  } else if (req.method === 'DELETE') {
    const { id } = req.query;
    if (typeof id !== 'string') {
      throw new BadRequestError('Id must be a string');
    }
    const user = await prisma.user.delete({
      where: {
        id,
      },
    });
    res.status(200).json(serialize('Delete specific user successful', user));
  } else {
    throw new MethodNotAllowedError();
  }
});

export default SpecificUser;
