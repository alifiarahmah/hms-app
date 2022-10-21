import prisma from '@services/prisma';
import webPush from './pwa/webPush';

const pushNotification = async (title: string, message: string, target: string[]) => {
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
};

export { pushNotification };
