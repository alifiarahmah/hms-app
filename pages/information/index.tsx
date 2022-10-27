import { Box, Image, SimpleGrid, Text } from '@chakra-ui/react';
import DeptNavigation from 'components/dept_navigation';
import Layout from 'components/layout';
import Link from 'components/link';
import { useState } from 'react';

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

  return (
    <Layout bg="/images/bg_krem.png">
      <DeptNavigation
        selectedDept={selectedDept}
        setSelectedDept={setSelectedDept}
      />
      <SimpleGrid p={7} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} rowGap={5} columnGap={5}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Link key={i} href={`/information/${i}`}>
            <Box bg="white" color="#1F1B1F">
              <Image src="http://source.unsplash.com/random/300x200" alt="" h="200px" />
              <Box p={2}>
                <Text fontSize="sm">dd mm yy</Text>
                <Text>{selectedDept}</Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Information;
