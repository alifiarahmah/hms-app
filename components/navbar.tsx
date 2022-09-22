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
import Link from 'next/link';
import { MdMenu } from 'react-icons/md';

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
    path: '/gallery',
    label: 'Gallery',
  },
  {
    path: '/mading',
    label: 'Mading',
  },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
            <Button variant="outline">Login</Button>
          </Stack>
        </Box>
        <IconButton
          variant="unstyled"
          size="lg"
          onClick={onOpen}
          display={{ base: 'flex', lg: 'none' }}
          aria-label="Menu"
          icon={<MdMenu size="2rem" color="white" />}
        />
      </Container>

      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
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
              <Button variant="outline">Login</Button>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Navbar;
