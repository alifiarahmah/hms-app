import {
  Box,
  Flex,
  Heading,
  Text,
  Image,
  SimpleGrid,
  useMediaQuery,
  Center,
} from '@chakra-ui/react';
import { CalendarEvent, Image as ImageType, ImagePost, Post } from '@prisma/client';
import { InfoCard, MadingCard, TimelineCard } from 'components/cards';
import Link from 'components/link';
import Navbar from 'components/navbar';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';

type PostWithImages = Post & {
  images: ImagePost[];
};

const Index = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
  const { status } = useSession();
  const [posts, setPosts] = useState<PostWithImages[]>([]);
  const [madings, setMadings] = useState<ImageType[]>([]);
  const [timelines, setTimelines] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    fetch('/api/user/post', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setPosts(data);
      });
    });

    fetch('/api/user/mading', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setMadings(data);
      });
    });

    fetch('/api/user/calendar', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }: { data: CalendarEvent[] }) => {
        setTimelines(
          data.filter((timeline) => new Date(timeline.start).getDate() == new Date().getDate())
        );
      });
    });
  }, []);

  useEffect(() => {
    console.log({ madings, posts, timelines });
  }, [madings, posts, timelines]);
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
          {status === 'authenticated' ? (
            timelines.length > 0 ? (
              timelines.map((timeline, i) => (
                <TimelineCard
                  title={timeline.title}
                  description={timeline.description || ''}
                  start={new Date(timeline.start)}
                  end={new Date(timeline.end)}
                  key={i}
                />
              ))
            ) : (
              <Text color="primary.100" fontWeight="bold">
                Tidak ada agenda hari ini
              </Text>
            )
          ) : (
            // box with dark background then text "Silahkan login untuk melihat agenda"
            <Center
              w="100%"
              h={200}
              bg="rgba(255,255,255,0.5)"
              borderRadius={10}
              display="flex"
              alignItems="center"
              justifyContent="center"
              boxShadow="0px 0px 10px 0px rgba(0,0,0,0.75)"
              onClick={() => {
                window.location.href = '/user/login';
              }}
            >
              Silahkan login untuk melihat agenda
            </Center>
          )}
          <Link textAlign="right" alignSelf="flex-end" href="/calendar">
            <Text textDecoration="underline">more on calendar</Text>
          </Link>
        </Flex>
        {/* Information and Mading */}
        <Flex flexDir="column" w="100%">
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
              {posts.slice(0, 6).map((post) => (
                <InfoCard
                  key={post.id}
                  image={
                    post.images.length > 0
                      ? `https://drive.google.com/uc?export=view&id=${post.images[0].imageId}`
                      : ''
                  }
                  title={post.title}
                  description={post.content.replace(/(<([^>]+)>)/gi, '').substring(0, 100)}
                  link={`/post/${post.id}`}
                  date={new Date(post.createdAt).toDateString()}
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
              {madings.slice(0, 6).map((mading) => (
                <MadingCard
                  key={mading.id}
                  image={`https://drive.google.com/uc?export=view&id=${mading.id}`}
                />
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
