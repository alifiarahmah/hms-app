import { Box, Flex, Heading, Text, Image, SimpleGrid, useMediaQuery } from '@chakra-ui/react';
import { InfoCard, MadingCard, TimelineCard } from 'components/cards';
import Link from 'components/link';
import Navbar from 'components/navbar';
import { useSession } from 'next-auth/react';
import Calendar from 'react-calendar';

const Index = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
  const { data: session, status } = useSession();
  return (
    <>
      <Navbar />
      <Box position="relative" w="100%" h={720}>
        <Image
          src="/images/sipil1.jpg"
          w="100%"
          h="100%"
          objectFit="cover"
          alt="GedungSipil"
          filter="blur(3.5px) brightness(50%)"
        />
        <Heading
          textAlign={'center'}
          size="3xl"
          color="primary.100"
          position="absolute"
          top="50%"
          left="50%"
          zIndex={999}
          transform="translate(-50%, -50%)"
        >
          Himpunan Mahasiswa Sipil
        </Heading>
      </Box>

      {/* Main Flex */}
      <Flex w="100%" flexDir={isSmallScreen ? 'column' : 'row-reverse'}>
        {/* Timeline */}
        <Flex
          display={isSmallScreen && status === 'unauthenticated' ? 'none' : 'flex'}
          bg="primary.300"
          p={8}
          py={8}
          flexDir="column"
          gap={6}
          maxWidth={isSmallScreen ? '100%' : '40%'}
          alignItems="center"
          bgImage="/images/bg_green.png"
        >
          <Calendar />
          {new Array(6).fill(0).map((_, i) => (
            <TimelineCard
              title="test"
              description="Pariatur esse est laboris aute. Ullamco commodo elit Lorem ex veniam elit nulla enim non quis nulla. Sint dolore Lorem aliqua aliqua pariatur tempor esse Lorem ex. Exercitation velit commodo exercitation veniam culpa proident et pariatur incididunt laborum eu consequat nisi. Anim tempor quis ea ullamco do sit consequat irure culpa ipsum ex labore."
              start={new Date()}
              end={new Date()}
              key={i}
            />
          ))}
          <Link textAlign="right" alignSelf="flex-end" href="/calendar">
            <Text textDecoration="underline">more on calendar</Text>
          </Link>
        </Flex>
        {/* Information and Mading */}
        <Flex flexDir="column">
          {/* Information */}
          <Flex
            p={8}
            flexDir="column"
            bg="pink.100"
            color="black.300"
            backgroundImage={'/images/bg_pink.png'}
          >
            <Heading>Information</Heading>
            <SimpleGrid minChildWidth={'300px'} spacing={10} mt={8} mb={6}>
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
            <Link alignSelf="flex-end" href="/information">
              <Text textDecoration="underline">more on information</Text>
            </Link>
          </Flex>
          {/* Mading */}
          <Flex p={8} flexDir="column" bgImage="/images/bg_krem.png" h="100%">
            <Heading>Mading</Heading>
            <SimpleGrid minChildWidth={'300px'} spacing={10} mt={8} mb={6}>
              {new Array(6).fill(0).map((_, i) => (
                <MadingCard key={i} image="images/sipil1.jpg" />
              ))}
            </SimpleGrid>
            <Link href="/mading">
              <Text textDecoration="underline" textAlign="right">
                more on mading
              </Text>
            </Link>
          </Flex>
        </Flex>
        {/* Footer */}
      </Flex>
    </>
  );
};

export default Index;
