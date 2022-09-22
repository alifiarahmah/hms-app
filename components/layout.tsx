import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Navbar from './navbar';

export interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Navbar />
      <Container as="main" p={{ base: 3, lg: 5 }}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
