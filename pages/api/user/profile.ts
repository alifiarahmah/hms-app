import { UnauthorizedError } from '@errors/auth';
import { MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import { EditProfileReqType, EditProfileSchema } from '@schemas/request';
import { NextApiRequest, NextApiResponse } from 'next';
import { User } from 'next-auth';
import { getToken } from 'next-auth/jwt';
import bcrypt from 'bcrypt';
import prisma from '@services/prisma';
import serialize from '@libs/server/serialize';

const Profile = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (!token) {
    throw new UnauthorizedError();
  }
  if (req.method === 'GET') {
    const user = token.user as User;
    const userData = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
    });
    res.json(serialize('Get self profile', userData));
  } else if (req.method === 'PATCH') {
    const { id } = token.user as User;
    const { name, email, password } = EditProfileSchema.parse(req.body);

    const data: EditProfileReqType = {};
    if (name) data['name'] = name;
    if (email) data['email'] = email;
    if (password) data['password'] = bcrypt.hashSync(password, process.env.BCRYPT_SALT_ROUNDS);
    const user = await prisma.user.update({
      where: {
        id,
      },
      data,
    });
    res.status(200).json(serialize('Edit profile success', user));
  } else {
    throw new MethodNotAllowedError();
  }
});

export default Profile;
