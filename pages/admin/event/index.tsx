import {
  Button,
  calc,
  Divider,
  Flex,
  Heading,
  Show,
  SimpleGrid,
  Spacer,
  useDisclosure,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import Sidebar from 'components/admin/sidebar';
import { Calendar, Event as BigCalendarEvent, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment';
import { useEffect, useState } from 'react';
import EventModal from 'components/admin/eventModal';
import { useRouter } from 'next/router';
import FileInput from 'components/fileInput';
import { MdUpload } from 'react-icons/md';

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

const AdminEvent = () => {
  const localizer = momentLocalizer(moment);
  const [date, setDate] = useState(new Date());
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [event, setEvent] = useState<Event>(blankEvent);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);
  const toast = useToast();

  const router = useRouter();
  const [smallScreen] = useMediaQuery('(max-width: 900px)');

  const handleOpenModal = (event: Event, isEdit: boolean) => {
    setEvent(event);
    setIsEdit(isEdit);
    onOpen();
  };

  const handleSubmit = async (isSubmit: boolean, rrule?: string) => {
    if (isSubmit) {
      const res = await fetch('/api/admin/calendar', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...event, rrule: rrule || null }),
      }).then((res) => res.json());
      if (!res.isError) {
        // router.reload();
      } else {
        toast({
          title: 'Error',
          description: res.message,
          status: 'error',
        });
      }
    }
    onClose();
  };

  const handleSelect = (event: Event) => {
    handleOpenModal(event, true);
  };

  const handleInputICS = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/admin/calendar/ics', {
        method: 'POST',
        body: formData,
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (!res.isError) {
        // router.reload();
      } else {
        toast({
          title: 'Error',
          description: res.message,
          status: 'error',
        });
      }
    }
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
    <Flex flexDir={'row'} w="calc(100vw - 67.5px)" bg="primary.100">
      <Sidebar />

      <Flex px={2} flexDir="column" w="100%" bg="primary.100">
        <EventModal
          isOpen={isOpen}
          onClose={handleSubmit}
          event={event}
          setEvent={setEvent}
          isEdit={isEdit}
        />
        <Flex p={2} gap={4}>
          <Heading>Calendar</Heading>
          <Spacer />
          <FileInput onChange={handleInputICS}>
            <MdUpload />
            ICS
          </FileInput>
          <Button colorScheme="primary" onClick={() => handleOpenModal(blankEvent, false)}>
            Add Event
          </Button>
        </Flex>
        <Divider borderColor="primary.500" mb={2} />
        <Flex flexDir={smallScreen ? 'column' : 'row'} w="calc(100vw - 67.5px)" gap="48px">
          {!smallScreen ? (
            <Calendar
              onNavigate={(date) => setDate(date)}
              selectable
              style={{ width: '50%' }}
              date={moment(date).startOf('month').toDate()}
              views={['month']}
              localizer={localizer}
              events={events}
              onSelectEvent={handleSelect}
              onSelectSlot={(slotInfo) => {
                const event = {
                  start: slotInfo.start,
                  end: slotInfo.end,
                  title: '',
                  description: '',
                  linkMeeting: '',
                };
                handleOpenModal(event, false);
              }}
            />
          ) : null}
          <Calendar
            toolbar={!!smallScreen}
            style={{ width: !smallScreen ? '50%' : 'calc(100vw - 67.5px)' }}
            onNavigate={(date) => setDate(new Date(date.getTime() + 1000 * 60 * 60 * 24))}
            date={moment(date).startOf('month').toDate()}
            defaultView="agenda"
            views={['agenda']}
            localizer={localizer}
            events={events}
            onSelectEvent={handleSelect}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminEvent;
