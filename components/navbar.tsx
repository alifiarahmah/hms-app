import {
  Avatar,
  Box,
  BoxProps,
  Button,
  Center,
  Container,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { MdMenu } from 'react-icons/md';
import Link, { DrawerLink } from './link';
import Login from './login';

const DrawerButton = ({ children, ...props }: BoxProps) => {
  return (
    <Box {...props} cursor="pointer" display="block" py={2} px={4} _hover={{ bg: 'primary.100' }}>
      {children}
    </Box>
  );
};

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
      <Box color="white" bg="primary.500" w="100%" position="relative" py={2} px={5} boxShadow="md">
        <Container display="flex" alignItems="center" justifyContent="space-between">
          <Link href="/">
            <Image src="/icons/android-icon-48x48.png" alt="logo" w="48px" h="48px" />
          </Link>
          <Box display={{ base: 'none', lg: 'flex' }}>
            <Stack direction="row" alignItems="center" gap={3}>
              {routes.map((r) => (
                <Link key={r.label} href={r.path}>
                  {r.label}
                </Link>
              ))}
              {session.status === 'authenticated' ? (
                <Popover>
                  <PopoverTrigger>
                    <Avatar size="sm" cursor="pointer" />
                  </PopoverTrigger>
                  <PopoverContent bg="black.100" color="black" w="fit-content">
                    <PopoverHeader>
                      <Text>Logged in as</Text>
                      <Text fontSize="xl" fontWeight="bold">
                        {session.data.user?.name}
                      </Text>
                    </PopoverHeader>
                    <PopoverBody p={0}>
                      <DrawerLink href="/profile">Profile</DrawerLink>
                      <DrawerButton onClick={() => signOut()}>Log Out</DrawerButton>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button onClick={onModalOpen} variant="outline">
                  Login
                </Button>
              )}
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
      </Box>

      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose}>
        <DrawerOverlay />
        <DrawerContent bg="primary.500" color="white">
          <DrawerHeader my={5}>
            <DrawerCloseButton />
          </DrawerHeader>
          <DrawerBody px={0}>
            <Center>
              <Image src="/icons/android-icon-48x48.png" alt="logo" w="48px" h="48px" />
              <Heading ml={2}>HMSApp</Heading>
            </Center>
            <Stack direction="column" my={5}>
              {session.status === 'authenticated' && (
                <Text textAlign="center">
                  Logged in as <strong>{session.data.user?.name}</strong>
                </Text>
              )}
              {routes.map((r) => (
                <DrawerLink key={r.label} href={r.path}>
                  {r.label}
                </DrawerLink>
              ))}
              {session.status === 'authenticated' ? (
                <DrawerLink href="/profile">Profile</DrawerLink>
              ) : null}
            </Stack>
            <Stack px={5}>
              {session.status === 'authenticated' ? (
                <Button onClick={() => signOut()} variant="outline">
                  Logout
                </Button>
              ) : (
                <Button onClick={onModalOpen} variant="outline">
                  Login
                </Button>
              )}
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Login isOpen={isModalOpen} onOpen={onModalOpen} onClose={onModalClose} />
    </>
  );
};

export default Navbar;
