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
    path: '/mading',
    label: 'Mading',
  },
  {
    path: '/gallery',
    label: 'Gallery',
  },
];

const Navbar = () => {
  const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();

  return (
    <>
      <Container
        bg="primary.500"
        color="white"
        alignItems="center"
        display="flex"
        justifyContent="space-between"
        width="100%"
        position="relative"
        py={2}
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
                Login
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
