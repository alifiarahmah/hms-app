import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { InvalidTokenError } from '@errors/auth';

const UserMiddleware = (req: NextApiRequest) => {
  const { headers } = req;
  const response = NextResponse.next();
  if (headers.authorization) {
    try {
      const token = headers.authorization.split(' ')[1];
      const { userId } = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
      req.cookies['userId'] = userId;
    } catch (e) {
      throw new InvalidTokenError();
    }
  }
  return response;
};

export default UserMiddleware;
