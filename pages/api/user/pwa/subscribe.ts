import { BadRequestError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import type { UserSubscription } from '@prisma/client';
import prisma from '@services/prisma';
import { MD5 } from 'crypto-js';
import { NextApiRequest, NextApiResponse } from 'next';
import { getToken } from 'next-auth/jwt';

type Subscription = {
  endpoint: string;
  expirationTime: string | null;
  keys: {
    p256dh: string;
    auth: string;
  };
};

const Subscribe = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const token: any = await getToken({ req });
  const subscription: Subscription = JSON.parse(req.body);

  if (!token || !subscription) {
    throw new BadRequestError('Invalid request');
  }

  const hash = MD5(subscription.endpoint).toString();
  const userSubscription = {
    id: hash,
    endpoint: subscription.endpoint,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    userId: token.user.id,
  };

  await prisma.userSubscription.upsert({
    where: {
      id: hash,
    },
    update: {
      userId: token.user.id,
    },
    create: userSubscription,
  });

  res.json(serialize('Subscribe success', token.user.id));
});

export default Subscribe;
