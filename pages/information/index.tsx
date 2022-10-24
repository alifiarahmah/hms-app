import { Box, Button, Flex, IconButton, Image, SimpleGrid, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import Link from 'components/link';
import { BiFilter } from 'react-icons/bi';

const departements = [
  'All',
  'Kesekjenan',
  'Medkominfo',
  'Internal',
  'Kemasyarakatan',
  'Keprofesian',
  'Organization Development',
  'ICEE',
  'SIBADES',
];

export const Information = () => {
  return (
    <Layout>
      <Flex
        flexDirection="row"
        bg="linear-gradient(180deg, #96B29E 23.68%, #F2E1CD 269.74%)"
        py={3}
        fontFamily="Gurindam"
      >
        {departements.map((departement) => (
          <Button key="" color="#175442" variant="link" mx={5} display="block">
            {departement}
          </Button>
        ))}
        <IconButton aria-label="sort" variant="unstyled" color="#175442" size="lg">
          <BiFilter />
        </IconButton>
      </Flex>
      <SimpleGrid m={7} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} rowGap={3} columnGap={2}>
        {Array.from({ length: 20 }).map((_, i) => (
          <Link key={i} href={`/information/${i}`}>
            <Box bg="white" color="#1F1B1F">
              <Image src="http://source.unsplash.com/random/300x200" alt="" h="200px" />
              <Box p={2}>
                <Text fontSize="sm">dd mm yy</Text>
                <Text>Judul ...</Text>
              </Box>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

export default Information;
