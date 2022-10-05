import { Box, Button, Heading, HStack, Link, Stack, Text, useToast } from '@chakra-ui/react';
import Layout from 'components/layout';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { ICalendar } from 'types/calendar';

const Index = () => {
  const session = useSession();
  const toast = useToast();
  const [events, setEvents] = useState<Array<ICalendar>>([]);

  useEffect(() => {
    if (session.status === 'authenticated') {
      fetch('/api/admin/calendar')
        .then((res) => res.json())
        .then((data) => {
          setEvents(data.data);
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
            <Box key={event.uid}>
              <Text fontWeight="bold">{event.title}</Text>
              <HStack justifyContent="space-between">
                <Text>{event.start}</Text>
                {/* <Text>Medkominfo</Text> */}
              </HStack>
              <Text>{event.description}</Text>
              {event.meetingLink ? (
                <Link href={event.meetingLink} isExternal>
                  <Button>Join Meeting</Button>
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
