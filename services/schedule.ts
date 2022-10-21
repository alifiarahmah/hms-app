import { pushNotification } from '@libs/notifications';
import { CalendarEvent } from '@prisma/client';
import schedule, { Job } from 'node-schedule';
import prisma from './prisma';

// schedule.scheduleJob('* * * * *', () => {
//   loadEvents().then(sendNotification);
// });
const todayEvents: CalendarEvent[] = [];
loadEvents();
// Function to send notification on the day before of the events
async function loadEvents() {
  // Clear today events
  todayEvents.splice(0, todayEvents.length);
  const events = await prisma.calendarEvent.findMany({
    where: {
      start: {
        gte: new Date(),
        lte: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      },
    },
  });

  todayEvents.push(...events);
}

async function sendNotification() {
  for (const event of todayEvents) {
    await pushNotification(
      event.title,
      `Event ${event.title} will start at ${event.start.toLocaleString()}`,
      []
    );
  }
}

export { loadEvents, sendNotification };
