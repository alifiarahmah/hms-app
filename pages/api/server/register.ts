import { InternalServerError } from '@errors/server';
import type { User } from '@prisma/client';
import prisma from '@services/prisma';
import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';

type RegisterBody = {
  datas: User[];
};

const Register = async (req: NextApiRequest, res: NextApiResponse) => {
  const body: RegisterBody = req.body;
  /*
  body: {
    datas: [
      {
        nim: string,
        name: string,
        email: string,
        password: string,
      }
    ]
  }
  */

  const datas = body.datas.map((user) => {
    return {
      nim: user.nim,
      name: user.name,
      email: user.email,
      password: bcrypt.hashSync(user.password, parseInt(process.env.BCRYPT_SALT_ROUNDS)),
    };
  });

  try {
    const result = await prisma.user.createMany({
      data: datas,
      skipDuplicates: true,
    });
    res.status(200).json(result);
  } catch (error) {
    throw new InternalServerError("Can't create user");
  }
};

export default Register;
