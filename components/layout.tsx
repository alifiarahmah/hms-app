import { Box, Flex } from '@chakra-ui/react';
import Navbar from 'components/navbar';

export interface LayoutProps {
  bg?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ bg, children }) => {
  return (
    <Flex direction="column" minH="100vh" bgImage={bg ?? 'transparent'}>
      <Navbar />
      <Box>{children}</Box>
    </Flex>
  );
};

export default Layout;
