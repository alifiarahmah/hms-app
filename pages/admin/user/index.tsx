import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightAddon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import CreateUserModal from 'components/admin/createUserModal';
import Sidebar from 'components/admin/sidebar';
import Loading from 'components/loading';
import useWarning from 'components/warningModal';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AdminUser = () => {
  const { warning, WarningModal } = useWarning();
  const router = useRouter();
  const [userData, setUserData] = useState<null | User[]>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDelete = (id: string) => {
    warning({
      title: 'Hapus user',
      description: 'Apakah anda yakin ingin menghapus user ini?',
      onConfirm: async () => {
        await fetch(`/api/admin/user/${id}`, {
          method: 'DELETE',
        })
          .then((res) => res.json())
          .catch((err) => console.log(err))
          .finally(() => {
            router.reload();
          });
      },
    });
  };

  const handleEdit = (id: string) => {
    router.push(`/admin/user/${id}`);
  };

  const handleCloseCreateUser = () => {
    onClose();
    router.reload();
  };

  useEffect(() => {
    fetch('/api/admin/user')
      .then((res) => res.json())
      .then((data) => {
        setUserData(data.data);
      })
      .catch((err) => {
        router.push('/admin/user');
      });
  }, [router]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <Flex flexDir="row" minW="120vw" bg="primary.100">
      <CreateUserModal isOpen={isOpen} onClose={handleCloseCreateUser} />
      <WarningModal />
      <Sidebar />
      <Flex minW="100vw" maxH="100vh" gap={2} px={2} flexDir="column">
        <Flex maxH="15vh" gap={2} pt={4} flexDir="column" position="sticky">
          <Flex gap={8}>
            <Heading color="primary.500">Users</Heading>
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
        {/* Chakra UI Table for users*/}
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
            <Tbody>
              {userData.map((user: User) => (
                <Tr key={user.id}>
                  <Td>{user.nim}</Td>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label={`edit ${user.nim}`}
                        icon={<EditIcon />}
                        colorScheme="primary"
                        onClick={() => handleEdit(user.id)}
                      />
                      <IconButton
                        aria-label={`delete ${user.nim}`}
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        onClick={() => handleDelete(user.id)}
                      />
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminUser;
