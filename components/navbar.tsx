import { Container, Flex, Heading, HStack } from '@chakra-ui/react';
import Link from './link';

const Navbar = () => {
  return (
    <Flex bg="primary.500" color="white">
      <Container display="flex" justifyContent="space-between">
          <HStack alignItems="center" spacing={3}>
            <Heading as="h1">HMS App</Heading>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/blog">Blog</Link>
          </HStack>
          <HStack alignItems="center">
            <Link href="/login">Login</Link>
          </HStack>
      </Container>
    </Flex>
  );
};

export default Navbar;
