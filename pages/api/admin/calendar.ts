import { parseICS, parseRRule } from '@libs/calendar';
import { AsyncRoute } from '@libs/server/asyncWrapper';
import { BuildFileMiddleware, BuildRoute } from '@libs/server/nextConnect';
import serialize from '@libs/server/serialize';

import { NextApiRequest, NextApiResponse } from 'next';
import { CalendarEvent } from '@prisma/client';
import prisma from '@services/prisma';
import { CalendarCache } from '@libs/cache';

const CalendarRoute = BuildRoute();
CalendarRoute.post(
  BuildFileMiddleware('single'),
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const ICSData = req.file.buffer.toString();
      const Data = parseICS(ICSData).map((item, index) => {
        const res: CalendarEvent = {
          uid: item.uid,
          start: item.start,
          end: item.end,
          title: item.summary,
          description: null,
          rrule: null,
        };
        if (item.description) {
          res.description = item.description;
        }
        if (item.rrule) {
          res.rrule = item.rrule.toString();
          console.log(item);
        }
        return res;
      });
      const result = await prisma.calendarEvent.createMany({
        data: Data,
        skipDuplicates: true,
      });
      CalendarCache.clear();
      res.json(serialize('Upload ICS success', result));
    }
  )
);

export default CalendarRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};
