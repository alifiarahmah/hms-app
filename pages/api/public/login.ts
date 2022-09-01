import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

import ErrorHandler from '@libs/server/errorHandler';

import { LoginReqSchema } from '@schemas/request';
import { MethodNotAllowedError } from '@errors/server';

import type { ResType, LoginResType } from '@schemas/response';
import { InvalidUsernameOrPasswordError } from '@errors/auth';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';

const Login = ErrorHandler(
  async (req: NextApiRequest, res: NextApiResponse<ResType<LoginResType>>) => {
    if (req.method !== 'POST') {
      throw new MethodNotAllowedError();
    }

    const rawBody = req.body;
    const body = LoginReqSchema.parse(rawBody);
    const user = await prisma.user.findUnique({
      where: {
        nim: body.nim,
      },
    });
    
    if (user && bcrypt.compareSync(body.password, user.password)) {
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });
      res.status(200).json(serialize('Login success', { token }));
    } else {
      throw new InvalidUsernameOrPasswordError();
    }
  }
);

export default Login;
