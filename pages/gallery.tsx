import { Button, Heading, Image, Select, SimpleGrid, Stack, Text } from '@chakra-ui/react';
import Layout from 'components/layout';

// TODO: implement pagination

const Gallery = () => {
  return (
    <Layout>
      <Heading as="h1" mb={10}>
        Gallery
      </Heading>
      <Select bg="" fontSize="1.25rem">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mx={20} my={10}>
        {Array.from({ length: 15 }).map((_, i) => (
          <Image key={i} alt="random" src="https://source.unsplash.com/random" />
        ))}
      </SimpleGrid>

      <Stack direction="row" justifyContent="center" alignItems="center">
        <Button isDisabled>First</Button>
        <Button isDisabled>Prev</Button>
        <Text px={5}>1/10</Text>
        <Button>Next</Button>
        <Button>Last</Button>
      </Stack>
    </Layout>
  );
};

export default Gallery;
