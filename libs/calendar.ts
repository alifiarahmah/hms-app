import ical from 'node-ical';
import { RRule } from 'rrule';

// Ical on SiX have the worst format for date, so it needs to be formatted specially
const formatDate = (input: string) => {
  try {
    // SiX Format
    const rawDate = input.split('T')[0].split(':')[1];
    const date = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
    const rawTime = input.split('T')[1];
    const time = `${rawTime.slice(0, 2)}:${rawTime.slice(2, 4)}:${rawTime.slice(4, 6)}`;
    return `${date}T${time}`;
  } catch (e) {
    // Normal Format (GCal)
    return input;
  }
};

const parseICS = (ics: string) => {
  const data = Object.values(ical.sync.parseICS(ics))
    .filter((item) => {
      return item.type === 'VEVENT';
    })
    .map((item) => {
      const event = item as any;
      return {
        ...event,
        start: new Date(formatDate(event.start)),
        end: new Date(formatDate(event.end)),
      };
    });

  return data as ical.VEvent[];
};

const parseRRule = (rrule: string) => {
  return RRule.fromString(rrule);
};

export { parseICS, parseRRule };
