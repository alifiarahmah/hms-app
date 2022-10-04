import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import Link from 'components/link';
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const Index = () => {
  return (
    <Layout>
      <Calendar
        localizer={localizer}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
      <Heading pt={5}>Upcoming events</Heading>
      <Stack py={5}>
        {Array.from({ length: 3 }).map((_, i) => {
          return (
            <Box key={i}>
              <Text fontWeight="bold">Event {i}</Text>
              <HStack justifyContent="space-between">
                <Text>DD-MM-YY HH:MM</Text>
                <Text>Medkominfo</Text>
              </HStack>
              <Text>Lorem ipsum dolor sit amet</Text>
              <Link href="https://google.com" isExternal>
                <Button>Join Meeting</Button>
              </Link>
            </Box>
          );
        })}
      </Stack>
    </Layout>
  );
};

export default Index;
