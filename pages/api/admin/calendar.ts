import { parseICS, parseRRule } from '@libs/calendar';
import { AsyncRoute } from '@libs/server/asyncWrapper';
import { BuildFileMiddleware, BuildRoute } from '@libs/server/nextConnect';
import serialize from '@libs/server/serialize';

import { NextApiRequest, NextApiResponse } from 'next';
import { CalendarEvent, Prisma } from '@prisma/client';
import prisma from '@services/prisma';
import { CalendarCache } from '@libs/cache';
import { BadRequestError, InternalServerError } from '@errors/server';

const CalendarRoute = BuildRoute();
CalendarRoute.get(
  AsyncRoute(async (req: NextApiRequest, res: NextApiResponse) => {
    let query = req.query as Prisma.CalendarEventWhereInput;
    if (!query) {
      query = {};
    }
    const calendarEvent = await prisma.calendarEvent.findMany({ where: query });
    res.json(serialize('Get Calendar Event Success', calendarEvent));
  })
);
CalendarRoute.post(
  BuildFileMiddleware('single'),
  AsyncRoute(
    async (
      req: NextApiRequest & {
        file: Express.Multer.File;
      },
      res: NextApiResponse
    ) => {
      const { file } = req;
      if (!file) throw new InternalServerError('No file uploaded');
      if (file.mimetype !== 'text/calendar') throw new BadRequestError('File is not an ICS file');
      const ICSData = file.buffer.toString();
      const Data = parseICS(ICSData).map((item) => {
        const linkRegex = /(https?\:\/\/[^ ]*)/g;
        let links = item.description.replace(/\s|<\/[a-z]{0-3}>/g, ' ').match(linkRegex);
        if (links) {
          links = links.filter((link) => link.includes('zoom') || link.includes('meet.google.com'));
        }
        const res: CalendarEvent = {
          uid: item.uid,
          start: item.start,
          end: item.end,
          title: item.summary,
          description: null,
          rrule: null,
          meetingLink: links ? links[0] : null,
        };
        if (item.description) {
          res.description = item.description
            .replace(/-\:\:[^\s]*\:\:-/g, '')
            .replace('Please do not edit this section.', '')
            .replace(/(<.*>){2,3}/g, '\n');
          console.log(res.description);
        }
        if (item.rrule) {
          res.rrule = item.rrule.toString();
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
