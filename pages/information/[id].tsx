import { Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import Link from 'components/link';
import moment from 'moment';
import 'moment/locale/id';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IPost } from 'types/post';

moment.locale('id');

export const Information = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<IPost>({} as IPost);
  const [newest, setNewest] = useState<IPost[]>([]);

  useEffect(() => {
    fetch(`/api/user/post/id/${id}`, {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setPost(data);
      });
    });
  }, []);

  useEffect(() => {
    fetch(`/api/user/post`, {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        console.log(data);
        setNewest(data);
      });
    });
  }, []);

  if (!post) {
    return <Layout>No post</Layout>;
  }
  return (
    <Layout bg="/images/bg_pattern.png">
      <Flex minH="100vh" flexDirection={{ base: 'column', lg: 'row' }}>
        <Box px={5} py={10} w={{ lg: '75vw' }}>
          <Text fontFamily="Gurindam" fontSize="md" color="#175442">
            {post.tags?.[0].name} / {post.title}
          </Text>
          <Heading color="#1F1B1F" fontFamily="Gurindam" fontSize="2xl" mt={5}>
            {post.title}
          </Heading>
          <Text color="#1F1B1F" my={3}>
            {moment(post.createdAt).fromNow()}
          </Text>
          <Text fontSize="md" color="#1F1B1F" dangerouslySetInnerHTML={{ __html: post.content }} />
        </Box>
        <Box px={5} py={10} bgImage="/images/bg_pink.png" bgColor="#F5D2BF" w={{ lg: '25vw' }}>
          <Heading mb={3} fontSize="md">
            Newest Post
          </Heading>
          {newest.map((newPost) => (
            <Link key={newPost.id} href={`/information/${newPost.id}`}>
              <Flex bg="white" color="#1F1B1F" my={5} overflowX="hidden">
                <Image
                  src={
                    newPost.images.length > 0
                      ? `https://drive.google.com/uc?export=view&id=${newPost.images[0].imageId}`
                      : 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=100&ixid=MnwxfDB8MXxyYW5kb218MHx8Zmxvd2VyfHx8fHx8MTY2NzA1MTg2NA&ixlib=rb-4.0.3&w=70'
                  }
                  w="70px"
                  h="100px"
                  objectFit="cover"
                  alt={newPost.title}
                />
                <Box p={2}>
                  <Text fontSize="sm">{moment(newPost.createdAt).fromNow()}</Text>
                  <Text noOfLines={1}>{newPost.title}</Text>
                </Box>
              </Flex>
            </Link>
          ))}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Information;
