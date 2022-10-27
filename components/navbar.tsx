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
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Link from './link';

const Navbar = () => {
  const [isSmallScreen] = useMediaQuery('(max-width: 900px)');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session, status } = useSession();
  const router = useRouter();
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
                <Link href="/about" fontWeight={'bold'}>
                  About
                </Link>
                {status === 'authenticated' && (
                  <Link href="/calendar" fontWeight={'bold'}>
                    Calendar
                  </Link>
                )}
                <Link href="/information" fontWeight={'bold'}>
                  Information
                </Link>
                <Link href="/mading" fontWeight={'bold'}>
                  Mading
                </Link>
                <Divider />
                {status === 'authenticated' ? (
                  <Button
                    variant="outline"
                    sx={{
                      _active: {
                        bg: 'transparent',
                      },
                      _focus: {
                        bg: 'transparent',
                      },
                      _hover: {
                        bg: 'transparent',
                      },
                    }}
                    mr={3}
                    onClick={() => {
                      signOut();
                    }}
                  >
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
                      _hover: {
                        bg: 'transparent',
                      },
                    }}
                    variant="outline"
                    mr={3}
                    onClick={() => {
                      router.push('/user/login');
                    }}
                  >
                    Login
                  </Button>
                )}
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
      <Image src="/icons/icon-512x512.png" alt="Logo" />
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
            <Link href="/" color="primary.100">
              Home
            </Link>
          </Center>
          <Center>
            <Link href="/about" color="primary.100">
              About
            </Link>
          </Center>
          {status === 'authenticated' ? (
            <Center>
              <Link href="/calendar" color="primary.100">
                Calendar
              </Link>
            </Center>
          ) : null}
          <Center>
            <Link href="/information" color="primary.100">
              Information
            </Link>
          </Center>
          <Center>
            <Link href="/mading" color="primary.100">
              Mading
            </Link>
          </Center>
          <Center py={3}>
            <Divider orientation="vertical" />
          </Center>
          {status === 'authenticated' ? (
            <>
              <Center color="primary.100">
                {/* <Image src="/icons/user-icon.png" alt="User Icon" />
                {session?.user?.name} */}
                <Menu>
                  <MenuButton
                    px={0}
                    as={Button}
                    sx={{
                      bg: 'transparent',
                      _active: {
                        bg: 'transparent',
                      },
                      _focus: {
                        bg: 'transparent',
                      },
                      _hover: {
                        bg: 'transparent',
                      },
                    }}
                    leftIcon={<Image alt="user icon" src="/icons/user-icon.png" />}
                  >{`${session?.user?.name}`}</MenuButton>
                  <MenuList
                    sx={{
                      bg: 'primary.500',
                      _active: {
                        bg: 'primary.500',
                      },
                      _focus: {
                        bg: 'primary.500',
                      },
                      _hover: {
                        bg: 'primary.500',
                      },
                    }}
                  >
                    {session?.user?.nim === 'admin' ? (
                      <MenuItem
                        sx={{
                          bg: 'transparent',
                          _active: {
                            bg: 'transparent',
                          },
                          _focus: {
                            bg: 'transparent',
                          },
                          _hover: {
                            bg: 'transparent',
                          },
                        }}
                      >
                        <Button
                          sx={{
                            bg: 'transparent',
                            _active: {
                              bg: 'transparent',
                            },
                            _focus: {
                              bg: 'transparent',
                            },
                            _hover: {
                              bg: 'transparent',
                            },
                          }}
                          onClick={() => router.push('/admin/user')}
                        >
                          Admin Page
                        </Button>
                      </MenuItem>
                    ) : null}
                    <MenuItem
                      sx={{
                        bg: 'transparent',
                        _active: {
                          bg: 'transparent',
                        },
                        _focus: {
                          bg: 'transparent',
                        },
                        _hover: {
                          bg: 'transparent',
                        },
                      }}
                    >
                      <Button
                        sx={{
                          bg: 'transparent',
                          _active: {
                            bg: 'transparent',
                          },
                          _focus: {
                            bg: 'transparent',
                          },
                          _hover: {
                            bg: 'transparent',
                          },
                        }}
                        onClick={() => signOut().then(() => router.push('/'))}
                      >
                        Logout
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Center>
            </>
          ) : (
            <Center>
              <Link href="/user/login" color="primary.100">
                Login
              </Link>
            </Center>
          )}
        </>
      )}
    </Flex>
  );
};

export default Navbar;
