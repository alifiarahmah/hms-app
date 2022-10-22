import { Center, Flex, Heading, Image, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { InfoCard, MadingCard, TimelineCard } from 'components/cards';
import Navbar from 'components/navbar';
import { useSession } from 'next-auth/react';
import Calendar from 'react-calendar';

const Index = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar />
      {/* Hero */}
      {/* TODO: background filter blur + brightness 0.5 */}
      <Center
        w="100%"
        h={720}
        bg="transparent"
        backdropFilter="blur(10px)"
        bgImage={'images/sipil1.jpg'}
        bgPosition="center"
        bgSize="cover"
        px={12}
      >
        <Heading textAlign={'center'} size="3xl" color="primary.100">
          Himpunan Mahasiswa Sipil
        </Heading>
      </Center>

      {/* Main Flex */}
      <Flex w="100%" flexDir={isSmallScreen ? 'column' : 'row-reverse'}>
        {/* Timeline */}
        <Flex
          display={isSmallScreen && status === 'unauthenticated' ? 'none' : 'flex'}
          bg="primary.300"
          minW="380px"
          p={8}
          py={8}
          flexDir="column"
          gap={8}
        >
          <Calendar />
          {new Array(6).fill(0).map((_, i) => (
            <TimelineCard
              title="test"
              date={`${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`}
              key={i}
            />
          ))}
        </Flex>
        {/* Information and Mading */}
        <Flex flexDir="column" w="100%">
          {/* Information */}
          <Flex p={8} flexDir="column" bg="pink.100" color="black.300">
            <Heading>Information</Heading>
            <SimpleGrid minChildWidth={'300px'} spacing={10} mt={4}>
              {new Array(6).fill(0).map((_, i) => (
                <InfoCard
                  key={i}
                  image="images/sipil1.jpg"
                  title="test"
                  description="test"
                  link="/"
                  date={new Date().toDateString()}
                />
              ))}
            </SimpleGrid>
          </Flex>
          {/* Mading */}
          <Flex p={8} flexDir="column">
            <Heading>Mading</Heading>
            <SimpleGrid minChildWidth={'300px'} spacing={10} mt={4}>
              {new Array(6).fill(0).map((_, i) => (
                <MadingCard key={i} image="images/sipil1.jpg" />
              ))}
            </SimpleGrid>
          </Flex>
        </Flex>
        {/* Footer */}
      </Flex>
    </>
  );
};

export default Index;
