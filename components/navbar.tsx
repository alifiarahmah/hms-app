import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
  Divider,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import Link from './link';

const Navbar = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  return (
    <Flex
      flexDir="row"
      p={2}
      px={8}
      h="64px"
      w="100%"
      verticalAlign={'center'}
      gap={12}
      bg="primary.500"
      zIndex={100}
    >
      {/* Right Drawer */}
      <Drawer onClose={onClose} placement="right" size="xs" isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent bg="primary.500" color="primary.100">
            <DrawerHeader>
              <Heading textAlign="center">HMSApp</Heading>
            </DrawerHeader>
            <DrawerBody>
              <Flex textAlign={'center'} gap={8} flexDir="column">
                <Divider />
                <Link href="/" fontWeight={'bold'}>
                  Home
                </Link>
                <Link href="/" fontWeight={'bold'}>
                  About
                </Link>
                {status === 'authenticated' && (
                  <Link href="/" fontWeight={'bold'}>
                    Calendar
                  </Link>
                )}
                <Link href="/information" fontWeight={'bold'}>
                  Information
                </Link>
                <Link href="/" fontWeight={'bold'}>
                  Mading
                </Link>
                <Divider />
                {status === 'authenticated' ? (
                  <Button variant="outline" mr={3} onClick={() => {}}>
                    Logout
                  </Button>
                ) : (
                  <Button
                    sx={{
                      _active: {
                        bg: 'transparent',
                      },
                      _focus: {
                        bg: 'transparent',
                      },
                    }}
                    variant="outline"
                    mr={3}
                    onClick={() => {}}
                  >
                    Login
                  </Button>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Image src="icons/icon-512x512.png" alt="Logo" />
      <Spacer />
      {isSmallScreen ? (
        <Center>
          <IconButton
            aria-label="Menu"
            variant={'ghost'}
            color="primary.100"
            icon={<HamburgerIcon boxSize={[8, 8]} />}
            sx={{
              '&:focus': {
                bg: 'transparent',
              },
              '&:hover': {
                bg: 'transparent',
              },
              '&:active': {
                bg: 'transparent',
              },
            }}
            onClick={onOpen}
          />
        </Center>
      ) : (
        <>
          <Center>
            <Link color="primary.100">Home</Link>
          </Center>
          <Center>
            <Link color="primary.100">About</Link>
          </Center>
          {status === 'authenticated' ? (
            <Center>
              <Link color="primary.100">Calendar</Link>
            </Center>
          ) : null}
          <Center>
            <Link href="/information" color="primary.100">
              Information
            </Link>
          </Center>
          <Center>
            <Link color="primary.100">Mading</Link>
          </Center>
          <Center py={3}>
            <Divider orientation="vertical" />
          </Center>
          <Center>
            <Link color="primary.100">Login</Link>
          </Center>
        </>
      )}
    </Flex>
  );
};

export default Navbar;
