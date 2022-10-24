import { Box } from '@chakra-ui/react';
import Navbar from 'components/navbar';

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <Navbar />
      <Box>{children}</Box>
    </>
  );
};

export default Layout;
