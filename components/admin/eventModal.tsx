import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Select,
  Spacer,
  Textarea,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import { parseRRule } from '@libs/calendar';
import { CalendarEvent } from '@prisma/client';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { Event as BigCalendarEvent } from 'react-big-calendar';
import { RRule } from 'rrule';

type Event = {
  uid?: string;
  title: string;
  description?: string;
  meetingLink?: string;
  start: Date;
  end: Date;
  rrule?: string;
};

interface EventModalProps {
  isOpen: boolean;
  onClose: (isSubmit: boolean, rrule?: string) => void;
  onOpen?: () => void;
  event: Event;
  setEvent: (event: Event) => void;
  isEdit: boolean;
}

const EventModal = ({ isOpen, onClose, onOpen, event, setEvent, isEdit }: EventModalProps) => {
  const [isEditable, setIsEditable] = useState({
    title: false,
    description: false,
    start: false,
    end: false,
    meetingLink: false,
  });
  const [recurring, setRecurring] = useState<RRule>();
  const router = useRouter();
  const toast = useToast();
  const handleChangeRecurring = ({ type, until }: { type: 'WEEKLY' | 'MONTHLY'; until: Date }) => {
    const rrule = new RRule({
      freq: RRule[type],
      until,
    });
    setRecurring(rrule);
  };

  const handleDelete = async () => {
    const res = await fetch('/api/admin/calendar', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid: event.uid }),
    }).then((res) => res.json());
    if (res.isError) {
      toast({
        title: 'Error',
        description: 'Failed to delete event',
        status: 'error',
      });
    } else {
      router.reload();
    }
  };

  useEffect(() => {
    if (event.rrule) {
      setRecurring(RRule.fromString(event.rrule));
    }
  }, [event.rrule]);

  useEffect(() => {
    setIsEditable({
      title: !isEdit,
      description: !isEdit,
      start: !isEdit,
      end: !isEdit,
      meetingLink: !isEdit,
    });
  }, [isEdit]);

  return (
    <Modal isOpen={isOpen} onClose={() => onClose(false)}>
      <ModalOverlay />
      <ModalContent py={6} px={4} gap={2}>
        <FormControl>
          <FormLabel>
            <Heading size="xs">Title</Heading>
          </FormLabel>
          <InputGroup>
            <Input
              value={event.title}
              borderColor="transparent"
              disabled={!isEditable.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
            />
            {isEdit ? (
              <InputRightElement>
                <IconButton
                  aria-label="edit name"
                  colorScheme="primary"
                  icon={isEditable.title ? <CheckIcon /> : <EditIcon />}
                  onClick={() => setIsEditable({ ...isEditable, title: !isEditable.title })}
                />
              </InputRightElement>
            ) : null}
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>
            <Heading size="xs">Description</Heading>
          </FormLabel>
          <InputGroup>
            <Textarea
              value={event.description}
              borderColor="transparent"
              disabled={!isEditable.description}
              resize={'none'}
              onChange={(e) => setEvent({ ...event, description: e.target.value })}
            />
            {isEdit ? (
              <InputRightElement>
                <IconButton
                  aria-label="edit name"
                  colorScheme="primary"
                  icon={isEditable.description ? <CheckIcon /> : <EditIcon />}
                  onClick={() =>
                    setIsEditable({ ...isEditable, description: !isEditable.description })
                  }
                />
              </InputRightElement>
            ) : null}
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>
            <Heading size="xs">Start</Heading>
          </FormLabel>
          <InputGroup>
            <Input
              value={event.start.toISOString().slice(0, 16)}
              type="datetime-local"
              borderColor="transparent"
              disabled={!isEditable.start}
              resize={'none'}
              onChange={(e) => setEvent({ ...event, start: new Date(e.target.value) })}
            />
            {isEdit ? (
              <InputRightElement>
                <IconButton
                  aria-label="edit name"
                  colorScheme="primary"
                  icon={isEditable.start ? <CheckIcon /> : <EditIcon />}
                  onClick={() => setIsEditable({ ...isEditable, start: !isEditable.start })}
                />
              </InputRightElement>
            ) : null}
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>
            <Heading size="xs">End</Heading>
          </FormLabel>
          <InputGroup>
            <Input
              value={event.end.toISOString().slice(0, 16)}
              borderColor="transparent"
              disabled={!isEditable.end}
              type="datetime-local"
              resize={'none'}
              onChange={(e) => {
                setEvent({ ...event, end: new Date(e.target.value) });
              }}
            />
            {isEdit ? (
              <InputRightElement>
                <IconButton
                  aria-label="edit name"
                  colorScheme="primary"
                  icon={isEditable.end ? <CheckIcon /> : <EditIcon />}
                  onClick={() =>
                    setIsEditable({ ...isEditable, description: !isEditable.description })
                  }
                />
              </InputRightElement>
            ) : null}
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>
            <Heading size="xs">Link Meeting</Heading>
          </FormLabel>
          <InputGroup>
            <Input
              value={event.meetingLink}
              borderColor="transparent"
              disabled={!isEditable.meetingLink}
              onChange={(e) => setEvent({ ...event, meetingLink: e.target.value })}
            />
            {isEdit ? (
              <InputRightElement>
                <IconButton
                  aria-label="edit name"
                  colorScheme="primary"
                  icon={isEditable.meetingLink ? <CheckIcon /> : <EditIcon />}
                  onClick={() =>
                    setIsEditable({ ...isEditable, meetingLink: !isEditable.meetingLink })
                  }
                />
              </InputRightElement>
            ) : null}
          </InputGroup>
        </FormControl>
        <Flex flexDir="row" gap={4}>
          <Heading size="xs">Recurring</Heading>
          <Checkbox
            isChecked={!!recurring}
            onChange={(e) => {
              setRecurring(
                e.target.checked
                  ? new RRule({
                      freq: RRule.WEEKLY,
                      until: new Date(event.start.getTime() + 1000 * 60 * 60 * 24 * 7 * 4),
                    })
                  : undefined
              );
            }}
          />
        </Flex>
        {/* implement recurring */}
        {recurring ? (
          <>
            <Select
              value={recurring.options.freq === RRule.WEEKLY ? 'WEEKLY' : 'MONTHLY'}
              onChange={(e) => {
                handleChangeRecurring({
                  type: e.target.value as 'WEEKLY' | 'MONTHLY',
                  until: recurring.options.until as Date,
                });
              }}
            >
              <option value="WEEKLY">Weekly</option>
              <option value="MONTHLY">Monthly</option>
            </Select>
            <Heading size="xs">Until</Heading>
            <Input
              value={recurring.options.until?.toISOString().slice(0, 10)}
              onChange={(e) => {
                handleChangeRecurring({
                  type: recurring.options.freq === RRule.WEEKLY ? 'WEEKLY' : 'MONTHLY',
                  until: new Date(e.target.value),
                });
              }}
              type="date"
            />
          </>
        ) : null}

        <ModalFooter>
          <IconButton
            aria-label="delete event"
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={handleDelete}
          />
          <Spacer />
          <Button mr={3} onClick={() => onClose(false)}>
            Cancel
          </Button>
          <Button colorScheme="primary" mr={3} onClick={() => onClose(true, recurring?.toString())}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EventModal;
