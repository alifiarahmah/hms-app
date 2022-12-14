import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Collapse,
  Divider,
  Fade,
  Flex,
  Heading,
  Hide,
  IconButton,
  Spacer,
  Stack,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Link from '../link';

// Chakra ui sidebar
const Sidebar = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const [sidebarSize, setSidebarSize] = useState<string>();

  useEffect(() => {
    // Close sidebar when click outside sidebar
    if (typeof window !== 'undefined') {
      window.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          if (!e.target.closest('#sidebar')) {
            onClose();
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isOpen) {
      setSidebarSize('260px');
    } else {
      setSidebarSize('67.5px');
    }
  }, [isOpen]);

  return (
    <>
      <Box minW="67.5px" w="67.5px" position="sticky" h="120vh" />
      <Flex
        onMouseLeave={onClose}
        bg="primary.500"
        color="white"
        px={2}
        position={isOpen ? 'fixed' : 'fixed'}
        as={motion.div}
        transition="ease-out 0.2s"
        w={sidebarSize}
        h={'100%'}
        zIndex={100}
      >
        {isOpen ? (
          <VStack w="100%" py={4} gap={4}>
            <Heading>HMSApp</Heading>
            <Divider />
            <Link href="/admin/user">
              <Heading size="md">User</Heading>
            </Link>
            <Link href="/admin/event">
              <Heading size="md">Event</Heading>
            </Link>
            <Link href="/admin/gallery">
              <Heading size="md">Gallery</Heading>
            </Link>
            <Link href="/admin/post">
              <Heading size="md">Posts</Heading>
            </Link>
            <Spacer />
            <Divider />
            <Button variant="outline" onClick={() => signOut()}>
              Logout
            </Button>
          </VStack>
        ) : (
          <IconButton
            colorScheme="primary"
            aria-label="toggle-sidebar"
            size="lg"
            icon={<HamburgerIcon />}
            onClick={onToggle}
          />
        )}
      </Flex>
    </>
  );
};

export default Sidebar;
