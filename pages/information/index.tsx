import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import DeptNavigation from 'components/dept_navigation';
import Layout from 'components/layout';
import Link from 'components/link';
import moment from 'moment';
import 'moment/locale/id';
import { useEffect, useState } from 'react';
import { IPost } from 'types/post';

moment.locale('id');

export const Information = () => {
  const [selectedDept, setSelectedDept] = useState('all');
  const [ascSort, setAscSort] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    fetch('/api/user/post', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setPosts(data);
      });
    });
  }, []);

  useEffect(() => {
    if (selectedDept !== 'all') {
      fetch(`/api/user/post/tag/${selectedDept}`, {
        method: 'GET',
      }).then((res) => {
        res.json().then(({ data }) => {
          setPosts(data);
        });
      });
    } else {
      fetch('/api/user/post', {
        method: 'GET',
      }).then((res) => {
        res.json().then(({ data }) => {
          setPosts(data);
        });
      });
    }
  }, [selectedDept])

  return (
    <Layout bg="/images/bg_krem.png">
      <DeptNavigation
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
        ascSort={ascSort}
        setAscSort={setAscSort}
      />
      <SimpleGrid p={7} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} rowGap={5} columnGap={5}>
        {posts.map((post) => (
          <Link key={post.id} href={`/information/${post.id}`}>
            <Box bg="white" color="#1F1B1F">
              <Image
                h="200px"
                w="100%"
                src={
                  post.images.length > 0
                    ? `https://drive.google.com/uc?export=view&id=${post.images[0].imageId}`
                    : 'https://images.unsplash.com/photo-1587334274328-64186a80aeee?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=200&ixid=MnwxfDB8MXxyYW5kb218MHx8Zmxvd2VyfHx8fHx8MTY2NzA1MTg2NA&ixlib=rb-4.0.3&w=300'
                }
                objectFit={post.images.length > 0 ? 'cover' : 'contain'}
                objectPosition="center"
                alt={post.title}
              />
              <Box p={2}>
                <Text fontSize="sm">{moment(post.createdAt).format('DD MMMM YYYY')}</Text>
                <Text>{post.title}</Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Information;
