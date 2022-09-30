import { Center, Spinner } from '@chakra-ui/react';

// full page loading with xl spinner in the middle
const Loading = () => {
  return (
    <Center w="100%" h="100%">
      <Spinner size="xl" thickness="4px" color="primary.500" />
    </Center>
  );
};

export default Loading;
