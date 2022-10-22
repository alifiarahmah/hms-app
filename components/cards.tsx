// Create a card with image, date and title

import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
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
      <Image src={image} alt={title} w="100%" h="100%" />
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
  link: string;
}

export const MadingCard = ({ image, link }: MadingCardProps) => {
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
      <Link>
        <Image src={image} alt="mading" w="100%" h="100%" />
      </Link>
    </Flex>
  );
};
