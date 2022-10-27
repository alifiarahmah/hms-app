// Create a card with image, date and title

import { Box, Button, Flex, Heading, Image, Spacer, Text } from '@chakra-ui/react';
import Link from 'components/link';

interface InfoCardProps {
  image: string;
  title: string;
  date: string;
  link: string;
  description: string;
}
export const InfoCard = ({ image, date, title, description, link }: InfoCardProps) => {
  return (
    <Flex
      w="100%"
      h="100%"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
      flexDir="column"
    >
      {/* box sized image */}
      <Box w="100%" h="200px" overflow="hidden" borderRadius="lg">
        <Image
          src={image !== '' ? image : '/images/sipil1.jpg'}
          alt={title}
          w="100%"
          h="100%"
          objectFit="cover"
        />
      </Box>
      <Flex flexDir="column" p={4}>
        <Text fontSize="sm" color="gray.500">
          {date}
        </Text>
        <Link>
          <Heading fontSize="lg" mt={2}>
            {title}
          </Heading>
        </Link>
      </Flex>
    </Flex>
  );
};

interface MadingCardProps {
  image: string;
}

export const MadingCard = ({ image }: MadingCardProps) => {
  return (
    <Flex
      w="100%"
      h="100%"
      bg="white"
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg', cursor: 'pointer' }}
      flexDir="column"
    >
      <Link href="/mading">
        {/* box sized image */}
        <Box w="100%" h="200px" overflow="hidden" borderRadius="lg">
          <Image
            src={image !== '' ? image : '/images/sipil1.jpg'}
            alt={image}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Link>
    </Flex>
  );
};

interface TimelineCardProps {
  title: string;
  start: Date;
  end: Date;
  description: string;
}

export const TimelineCard = ({ title, start, end, description }: TimelineCardProps) => {
  return (
    <Flex
      w="100%"
      minH="75px"
      bg="primary.700"
      color="primary.100"
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
      flexDir="column"
      p={4}
      gap={2}
      wordBreak={'break-all'}
    >
      <Flex>
        <Link href="/calendar">
          <Text fontSize="lg" fontWeight="semibold">
            {title.toUpperCase()}
          </Text>
        </Link>
        <Spacer />
        <Text fontSize="sm" color="gray.100">
          {/* FIXME: ganti format jadi HH:MM aja */}
          {start.toLocaleTimeString()} - {end.toLocaleTimeString()}
        </Text>
      </Flex>
      <Text textAlign="justify" fontSize="sm" color="gray.100">
        {description}
      </Text>
    </Flex>
  );
};
