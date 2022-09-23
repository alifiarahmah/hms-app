import webPush from '@libs/pwa/webPush';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const Notification = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  const { title, message, target } = req.body;

  let q: any;
  if (target) {
    q = {
      where: {
        user: {
          nim: {
            in: target,
          },
        },
      },
    };
  } else {
    q = {};
  }

  const userSubscription = await prisma.userSubscription.findMany(q);
  const subscriptions = userSubscription.map((sub) => {
    return {
      endpoint: sub.endpoint,
      keys: {
        p256dh: sub.p256dh,
        auth: sub.auth,
      },
    };
  });
  const promise = subscriptions.map((sub) => {
    return webPush.sendNotification(sub, JSON.stringify({ title, message }));
  });
  await Promise.all(promise);
  res.json(serialize('Notification sent', subscriptions.length));
});

export default Notification;
