import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Stack,
} from '@chakra-ui/react';
import React from 'react';
import Sidebar from './sidebar';

export interface LayoutAdminProps {
  title?: string;
  children: React.ReactNode;
  onAdd?: () => void;
}

const LayoutAdmin = ({ title, children, onAdd }: LayoutAdminProps) => {
  return (
    <>
      <Sidebar />
      <Stack ml="67.5px" maxH="100vh" gap={2} px={2}>
        {title && <Heading>{title}</Heading>}
        <Flex maxH="15vh" gap={2} pt={4} flexDir="column" position="sticky">
          <Flex gap={8}>
            <Heading color="primary.500">Users</Heading>
            <InputGroup borderColor="primary.500" mt={2}>
              <Input focusBorderColor="primary.500" />
              <InputRightAddon bg="transparent">
                <SearchIcon />
              </InputRightAddon>
            </InputGroup>
            <Button onClick={onAdd} mt={2} mr={4} colorScheme="primary" variant="link">
              <AddIcon />
            </Button>
          </Flex>
          <Divider borderColor="primary.500" />
        </Flex>
        {children}
      </Stack>
    </>
  );
};

export default LayoutAdmin;
