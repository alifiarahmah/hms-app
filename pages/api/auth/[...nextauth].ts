import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await NextAuth(req, res, {
    providers: [
      CredentialsProvider({
        name: 'credentials',
        credentials: {
          nim: {
            label: 'NIM',
            placeholder: 'NIM',
            required: true,
          },
          password: {
            label: 'Password',
            placeholder: 'Password',
            required: true,
          },
        },
        async authorize(credentials) {
          if (!credentials || !credentials.nim || !credentials.password) return null;
          const user = await prisma.user.findUnique({
            where: {
              nim: credentials.nim,
            },
            select: {
              id: true,
              nim: true,
              name: true,
              email: true,
              password: true,
            },
          });
          if (user && bcrypt.compareSync(credentials.password, user.password)) {
            return user;
          }
          return null;
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
    },
    adapter: PrismaAdapter(prisma),
    callbacks: {
      jwt: async ({ token, user }) => {
        // jwt payload
        if (user) {
          token.user = user;
        }
        return token;
      },
      session: async ({ session, token }: any) => {
        // session callback, add id and role properties
        session.user = token.user;
        return session;
      },
    },
  });
}
