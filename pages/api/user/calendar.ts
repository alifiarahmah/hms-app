import { CalendarCache } from '@libs/cache';
import { parseRRule } from '@libs/calendar';
import ErrorHandler from '@libs/server/errorHandler';
import serialize from '@libs/server/serialize';
import { CalendarEvent } from '@prisma/client';
import prisma from '@services/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

const Calendar = ErrorHandler(async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(CalendarCache);
  if (CalendarCache.data.length > 0) {
    res.json(serialize('Success Cached Get Calendar', CalendarCache.data));
    return;
  }
  const calendarEvent = await prisma.calendarEvent.findMany({});
  const resCalendar: CalendarEvent[] = [];
  calendarEvent.forEach((item) => {
    if (!item.rrule) {
      resCalendar.push(item);
    } else {
      const rdate = parseRRule(item.rrule).all((d) => {
        const nextYear = new Date();
        nextYear.setFullYear(nextYear.getFullYear() + 1);
        return d < nextYear;
      });
      rdate.forEach((date) => {
        const temp = { ...item };
        temp.start = date;
        const delta = date.getTime() - item.start.getTime();
        temp.end = new Date(item.start.getTime() + delta);
        temp.rrule = null;
        resCalendar.push(temp);
      });
    }
  });
  CalendarCache.set(resCalendar);
  res.json(serialize('Success Get Calendar', resCalendar));
});

export default Calendar;
