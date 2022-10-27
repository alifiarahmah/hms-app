import { Box } from '@chakra-ui/react';
import Navbar from 'components/navbar';

export interface LayoutProps {
  bg?: string;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ bg, children }) => {
  return (
    <>
      <Navbar />
      <Box bgImage={bg ?? 'transparent'}>{children}</Box>
    </>
  );
};

export default Layout;
