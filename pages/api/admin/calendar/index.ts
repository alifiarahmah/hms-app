import serialize from '@libs/server/serialize';

import { NextApiRequest, NextApiResponse } from 'next';
import { CalendarEvent, Prisma } from '@prisma/client';
import prisma from '@services/prisma';
import ErrorHandler from '@libs/server/errorHandler';
import { MethodNotAllowedError } from '@errors/server';
import { CreateSingleEventSchema } from '@schemas/request';
import { randomUUID } from 'crypto';
import { parseRRule } from '@libs/calendar';

const CalendarRoute = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    let query = req.query as Prisma.CalendarEventWhereInput;
    if (!query) {
      query = {};
    }
    const calendarEvent = await prisma.calendarEvent.findMany({ where: query });
    const resCalendarEvent: CalendarEvent[] = [];

    calendarEvent.forEach((item) => {
      if (item.rrule) {
        const rrule = parseRRule(item.rrule);
        const dates = rrule.all();
        dates.forEach((date: Date) => {
          const newEvent = { ...item, start: date, end: date };
          resCalendarEvent.push(newEvent);
        });
      } else {
        resCalendarEvent.push(item);
      }
    });

    res.json(serialize('Get Calendar Event Success', resCalendarEvent));
  } else if (req.method === 'PUT') {
    const data = CreateSingleEventSchema.parse(req.body);
    if (!data.uid) {
      data.uid = randomUUID();
    }
    const calendarEvent = await prisma.calendarEvent.upsert({
      where: { uid: data.uid },
      update: data,
      create: {
        uid: data.uid as string,
        ...data,
      },
    });
    res.json(serialize('Create Calendar Event Success', calendarEvent));
  } else if (req.method === 'DELETE') {
    const { uid } = req.body;
    const calendarEvent = await prisma.calendarEvent.delete({
      where: { uid },
    });
    res.json(serialize('Delete Calendar Event Success', calendarEvent));
  } else {
    throw new MethodNotAllowedError();
  }
});

export default CalendarRoute;
