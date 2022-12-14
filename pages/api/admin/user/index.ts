import { BadRequestError, MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { CreateSingleUserSchema } from '@schemas/request';

const User = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const users = await prisma.user.findMany({
      where: {
        nim: {
          not: 'admin',
        },
      },
    });
    res.status(200).json(serialize('Get users successful', users));
  } else if (req.method === 'POST') {
    const { name, email, password: unhashed, nim } = CreateSingleUserSchema.parse(req.body);
    const password = bcrypt.hashSync(unhashed, parseInt(process.env.BCRYPT_SALT_ROUNDS));
    try {
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password,
          nim,
        },
      });
      res.status(200).json(serialize('Create user successful', user));
    } catch {
      throw new BadRequestError('Username or email already exists');
    }
  } else {
    throw new MethodNotAllowedError();
  }
});

export default User;
