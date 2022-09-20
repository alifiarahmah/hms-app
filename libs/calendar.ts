import ical from 'node-ical';

// Ical have the worst format for date, so it needs to be formatted specially
const formatDate = (input: string) => {
  const rawDate = input.split('T')[0].split(':')[1];
  const date = `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}`;
  const rawTime = input.split('T')[1];
  const time = `${rawTime.slice(0, 2)}:${rawTime.slice(2, 4)}:${rawTime.slice(4, 6)}`;
  return `${date}T${time}`;
};

const parseICS = (ics: string) => {
  const data = Object.values(ical.sync.parseICS(ics))
    .filter((item) => {
      return item.type === 'VEVENT';
    })
    .map((item) => {
      const event = item as any;
      const startString = event.start as string;
      const endString = event.end as string;
      return {
        ...event,
        start: new Date(formatDate(event.start)),
        end: new Date(formatDate(event.end)),
      };
    });

  return data;
};

export { parseICS };
