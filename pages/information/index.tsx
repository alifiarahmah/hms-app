import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import DeptNavigation from 'components/dept_navigation';
import Layout from 'components/layout';
import Link from 'components/link';
import moment from 'moment';
import 'moment/locale/id'
import { useEffect, useState } from 'react';
import { IPost } from 'types/post';

moment.locale('id');

const departements = [
  {
    name: 'All',
    value: 'all',
  },
  {
    name: 'Kesekjenan',
    value: 'kesekjenan',
  },
  {
    name: 'Medkominfo',
    value: 'medkominfo',
  },
  {
    name: 'Internal',
    value: 'internal',
  },
  {
    name: 'Kemasyarakatan',
    value: 'kemasyarakatan',
  },
  {
    name: 'Keprofesian',
    value: 'keprofesian',
  },
  {
    name: 'Organization Development',
    value: 'organization-development',
  },
  {
    name: 'ICEE',
    value: 'icee',
  },
  {
    name: 'SIBADES',
    value: 'sibades',
  },
];

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
              <Image src="http://source.unsplash.com/random/300x200" alt="" h="200px" />
              <Box p={2}>
                <Text fontSize="sm">
                  {moment(post.createdAt).format('DD MMMM YYYY')}
                </Text>
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
