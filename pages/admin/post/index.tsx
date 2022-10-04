import { AddIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Post } from '@prisma/client';
import Sidebar from 'components/admin/sidebar';
import useWarning from 'components/warningModal';
import { useRouter } from 'next/router';
import { useState } from 'react';

const AdminPost = () => {
  const { warning, WarningModal } = useWarning();
  const router = useRouter();
  const [postData, setPostData] = useState<null | Post[]>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = (id: string) => {
    warning({
      title: 'Hapus post',
      description: 'Apakah anda yakin ingin menghapus post ini?',
      onConfirm: () => {},
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/post/${id}`);
  };

  const handleCloseCreatePost = () => {
    onClose();
    router.reload();
  };

  // if (!postData) {
  //   return <Loading />;
  // }

  return (
    <>
      <WarningModal />
      <Sidebar />
      <Flex ml="67.5px" maxH="100vh" gap={2} px={2} flexDir="column">
        <Flex maxH="15vh" gap={2} pt={4} flexDir="column" position="sticky">
          <Flex gap={8}>
            <Heading color="primary.500">Posts</Heading>
            <InputGroup borderColor="primary.500" mt={2}>
              <Input focusBorderColor="primary.500" />
              <InputRightAddon bg="transparent">
                <SearchIcon />
              </InputRightAddon>
            </InputGroup>
            <Button onClick={onOpen} mt={2} mr={4} colorScheme="primary" variant="link">
              <AddIcon />
            </Button>
          </Flex>
          <Divider borderColor="primary.500" />
        </Flex>
        {/* Chakra UI Table for posts*/}
        <Flex flexDir="column" overflow="auto">
          <Table colorScheme="primary">
            <Thead position="sticky" top="0" bg="primary.100" zIndex={50}>
              <Tr>
                <Th>NIM</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody></Tbody>
          </Table>
        </Flex>
      </Flex>
    </>
  );
};

export default AdminPost;
