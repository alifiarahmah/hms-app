import { Box, Button, Heading, Link, Stack, Text, useToast } from '@chakra-ui/react';
import Layout from 'components/layout';
import Loading from 'components/loading';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ICalendar } from 'types/calendar';

const readableDate = (date: string) => {
  const d = new Date(date);
  return moment(d).format('D/MM/YYYY HH:MM');
};

const relativeDate = (date: string) => {
  const d = new Date(date);
  return moment(d).startOf('day').fromNow();
};

const Index = () => {
  const session = useSession();
  const toast = useToast();
  const [events, setEvents] = useState<Array<ICalendar> | null>(null);

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetch('/api/admin/calendar')
        .then((res) => res.json())
        .then((data) => {
          setEvents(data.data.reverse());
        })
        .catch((err) => {
          toast({
            title: 'Error',
            description: err.message,
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        });
    }
  });

  if (!events) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }
  return (
    <Layout>
      {session.status === 'authenticated' ? (
        <Heading>Hello, {session.data?.user?.name}</Heading>
      ) : null}
      <Heading fontSize={session.status === 'authenticated' ? 'xl' : '2xl'}>
        Upcoming Events
      </Heading>
      <Stack py={5} gap={5}>
        {events.map((event: ICalendar) => {
          return (
            <Box key={event.uid} bg="primary.300" borderRadius="lg" p={3}>
              <Text fontWeight="bold" fontSize="2xl">
                {event.title} ({relativeDate(event.start)})
              </Text>
              <Text fontSize="md" mt={1}>
                {readableDate(event.start)} - {readableDate(event.end)}
              </Text>
              <Text fontSize="lg" mt={3}>
                {event.description}
              </Text>
              {event.meetingLink ? (
                <Link href={event.meetingLink} isExternal>
                  <Button mt={3} _hover={{ textDecoration: 'none' }}>
                    Join Meeting
                  </Button>
                </Link>
              ) : null}
            </Box>
          );
        })}
      </Stack>
    </Layout>
  );
};

export default Index;
