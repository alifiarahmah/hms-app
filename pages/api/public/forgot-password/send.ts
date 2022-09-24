import { InternalServerError } from "@errors/server";
import ErrorHandler from "@libs/server/errorHandler";
import serialize from "@libs/server/serialize";
import { SendTokenForgotPasswordSchema } from "@schemas/request";
import { sendEmail } from "@services/nodemailer";
import prisma from "@services/prisma";
import cuid from "cuid";
import { NextApiRequest, NextApiResponse } from "next";

const SendToken = ErrorHandler(
  async (req: NextApiRequest, res:NextApiResponse) => {
    if (req.method !== "POST") {
      throw new Error("Method not allowed");
    }
    
    const { nim, email } = SendTokenForgotPasswordSchema.parse(req.body);
    const user = await prisma.user.findUnique({
      where: {
        nim,
      },
    });
    if (user && user.email === email) {
      const token = cuid();
      await prisma.forgotPasswordToken.upsert({
        where: {
          userId: user.id,
        },
        update: {
          token,expires: new Date(Date.now() + 1000 * 60 * 5),
        },
        create: {
          token,
          userId: user.id,
          expires: new Date(Date.now() + 1000 * 60 * 5),
        },
      });
      const resEmail = await sendEmail({
        to: email,
        subject: "HMSApp : Forgot Password",
        html: `<p>Click <a href="http://localhost:3000/forgot-password/${token}">here</a> to reset your password</p>`,
        text: `Click http://localhost:3000/forgot-password/${token} to reset your password`,
      })
      if (resEmail.accepted.length === 0) {
        throw new InternalServerError("Send email error");
      }
    }
    res.json(serialize("Reset password requested", {
      nim, email
    }));
  }
)

export default SendToken;