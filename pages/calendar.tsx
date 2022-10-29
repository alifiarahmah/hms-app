import {
  Box,
  Button,
  Heading,
  InputGroup,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import Layout from 'components/layout';
import Link from 'components/link';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';

type Event = {
  uid?: string;
  title: string;
  description?: string;
  meetingLink?: string;
  start: Date;
  end: Date;
  rrule?: string;
};

const blankEvent = {
  start: new Date(),
  end: new Date(),
  title: '',
  description: '',
  linkMeeting: '',
};

const Event = () => {
  const localizer = momentLocalizer(moment);
  const [date, setDate] = useState(new Date());
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [event, setEvent] = useState<Event>(blankEvent);
  const [events, setEvents] = useState<Event[]>([]);
  const toast = useToast();

  const handleSelect = (event: Event) => {
    setEvent(event);
    onOpen();
  };

  useEffect(() => {
    fetch('/api/admin/calendar', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;

        setEvents(
          data.map((event: any) => {
            event.start = new Date(event.start);
            event.end = new Date(event.end);
            return event;
          })
        );
      })
      .catch((err) => {
        toast({
          title: 'Error',
          description: err.message,
          status: 'error',
        });
      });
  }, [toast]);

  return (
    <Layout>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent py={6} px={4} gap={2}>
          <Heading size="xs">Title</Heading>
          <InputGroup>
            <Text>{event.title}</Text>
          </InputGroup>
          <Heading size="xs">Description</Heading>
          <InputGroup>
            <Text>{event.description}</Text>
          </InputGroup>
          <Heading size="xs">Start</Heading>
          <Text>{moment(new Date(event.start)).format('LLL')}</Text>
          <Heading size="xs">End</Heading>
          <Text>{moment(new Date(event.end)).format('LLL')}</Text>
          <Heading size="xs">Link Meeting</Heading>
          <Link href={event.meetingLink} isExternal>
            <Button>Join Meeting</Button>
          </Link>

          <ModalFooter>
            <Button colorScheme="primary" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box p={10}>
        <Heading py={10} textAlign="center">HMS Events</Heading>
        <Stack w="100%">
          <Calendar
            onNavigate={(date) => setDate(date)}
            selectable
            date={moment(date).startOf('month').toDate()}
            views={['month']}
            localizer={localizer}
            events={events}
            onSelectEvent={handleSelect}
          />
        </Stack>
      </Box>
    </Layout>
  );
};

export default Event;
