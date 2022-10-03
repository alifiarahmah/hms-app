import {
  Box,
  Button,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { MdMenu } from 'react-icons/md';
import Link from './link';
import Login from './login';

export const routes = [
  {
    path: '/',
    label: 'Home',
  },
  {
    path: '/about',
    label: 'About',
  },
  {
    path: '/calendar',
    label: 'Kalender',
  },
  {
    path: '/info',
    label: 'Informasi',
  },
  {
    path: '/mading',
    label: 'Mading',
  },
];

const Navbar = () => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  const session = useSession();

  return (
    <>
      <Container
        bg="primary.500"
        color="white"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        w="100%"
        position="relative"
        py={2}
        px={5}
        boxShadow="md"
      >
        <Heading as="h1">HMS App</Heading>
        <Box display={{ base: 'none', lg: 'flex' }}>
          <Stack direction="row" alignItems="center">
            {routes.map((r) => (
              <Link key={r.label} href={r.path}>
                {r.label}
              </Link>
            ))}
            <Button onClick={onModalOpen} variant="outline">
              Login
            </Button>
          </Stack>
        </Box>
        <IconButton
          variant="unstyled"
          size="lg"
          onClick={onDrawerOpen}
          display={{ base: 'flex', lg: 'none' }}
          aria-label="Menu"
          icon={<MdMenu size="2rem" color="white" />}
        />
      </Container>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary.500" color="white">
          <DrawerHeader my={5}>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody p={5}>
            <Heading>HMSApp</Heading>
            <Stack direction="column" my={5}>
              {routes.map((r) => (
                <Link key={r.label} href={r.path}>
                  {r.label}
                </Link>
              ))}
              <Button onClick={onModalOpen} variant="outline">
                {session.status === 'authenticated' ? session.data.user?.name : null}
              </Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Login isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} />
    </>
  );
};

export default Navbar;
