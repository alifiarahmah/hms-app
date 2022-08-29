import { NextApiRequest, NextApiResponse } from 'next';

import ErrorHandler from '@libs/server/errorHandler';

import { LoginReqSchema } from '@schemas/request';
import { MethodNotAllowedError } from '@errors/server';

import type { LoginResType } from '@schemas/response';
import { InvalidUsernameOrPasswordError } from '@errors/auth';
import serialize from '@libs/server/serialize';

const Login = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse<LoginResType>) => {
  if (req.method !== 'POST') {
    throw new MethodNotAllowedError();
  }

  const rawBody = req.body;
  const body = LoginReqSchema.parse(rawBody);
  if (body.nim === 'nim' && body.password === 'password') {
    res.status(200).json(
      serialize('Login success', {
        token: 'nim',
        a: 'b',
        user: { id: '1', nim: '1', name: '1', email: '1' },
      })
    );
  } else {
    throw new InvalidUsernameOrPasswordError();
  }
});

export default Login;
