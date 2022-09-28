import {
  Divider,
  Flex,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import Sidebar from 'components/sidebar';
import { SearchIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import useWarning from 'components/warningModal';

const dummyUserData = [
  {
    id: 'asdasdasd',
    nim: '123456789',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  },
];
for (let i = 0; i < 100; i++) {
  dummyUserData.push({
    id: `asdasdasd${i}`,
    nim: '123456789',
    name: 'John Doe',
    email: 'johndoe@gmail.com',
  });
}

const AdminUser = () => {
  const { warning, WarningModal } = useWarning();

  const handleDelete = (id: string) => {
    warning({
      title: 'Hapus user',
      description: 'Apakah anda yakin ingin menghapus user ini?',
      onConfirm: () => {
        console.log(id);
      },
    });
  };

  const handleEdit = (id: string) => {
    console.log(id);
  };

  return (
    <>
      <WarningModal />
      <Sidebar />
      <Flex ml="67.5px" maxH="100vh" gap={2} px={2} flexDir="column">
        <Flex maxH="15vh" gap={2} pt={4} flexDir="column" position="sticky">
          <Flex gap={4}>
            <Heading color="primary.500">Users</Heading>
            <InputGroup borderColor="transparent" mt={2}>
              <Input focusBorderColor="primary.500" />
              <InputRightAddon bg="transparent" children={<SearchIcon />} />
            </InputGroup>
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
              {dummyUserData.map((user) => (
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
    </>
  );
};

export default AdminUser;
