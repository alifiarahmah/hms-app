import { MethodNotAllowedError } from '@errors/server';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import { loadEvents, sendNotification } from '@services/schedule';
import { NextApiRequest, NextApiResponse } from 'next';

const Notification = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') throw new MethodNotAllowedError();

  await loadEvents();
  await sendNotification();

  res.json(serialize('Send notification success', {}));
});

export default Notification;
