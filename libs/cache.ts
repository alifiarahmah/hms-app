import { CalendarEvent } from '@prisma/client';

const CalendarCache = {
  data: [] as CalendarEvent[],
  clear() {
    this.data = [];
  },
  set(data: CalendarEvent[]) {
    this.data = data;
  },
};

export { CalendarCache };
