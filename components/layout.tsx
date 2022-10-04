import { Container, Heading, Stack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './navbar';

export interface LayoutProps {
  title?: string;
  children: ReactNode;
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Navbar />
      <Container
        bg="primary.100"
        w={{ base: '100%', lg: 'container.lg' }}
        minH="100vh"
        as="main"
        px={{ base: 3, lg: 5 }}
        py={10}
      >
        <Stack>
          {title && <Heading my={5}>{title}</Heading>}
          {children}
        </Stack>
      </Container>
    </>
  );
};

export default Layout;
