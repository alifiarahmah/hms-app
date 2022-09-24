import { BadRequestError } from "@errors/server";
import ErrorHandler from "@libs/server/errorHandler";
import serialize from "@libs/server/serialize";
import { ConsumeTokenForgotPasswordSchema } from "@schemas/request";
import prisma from "@services/prisma";
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from "next";

const ConsumeToken = ErrorHandler(async (req:NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    throw new Error("Method not allowed");
  }
  const { token, password } = ConsumeTokenForgotPasswordSchema.parse(req.body);

  const forgotPasswordToken = await prisma.forgotPasswordToken.findUnique({
    where: {
      token
    }
  })

  if (!forgotPasswordToken) throw new BadRequestError("Invalid Token");

  const [_, user] = await prisma.$transaction([
    prisma.forgotPasswordToken.delete({
      where: {
        token
      }
    }),
    prisma.user.update({
      where: {
        id: forgotPasswordToken.userId
      },
      data: {
        password : bcrypt.hashSync(password, parseInt(process.env.BCRYPT_SALT_ROUNDS))
      }
    })
  ])

  res.json(serialize("Reset password success", {
    nim: user.nim,
  }));
})

export default ConsumeToken