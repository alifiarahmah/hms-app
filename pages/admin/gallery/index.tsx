import { AddIcon, DeleteIcon, EditIcon, SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  SimpleGrid,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useMediaQuery,
  useToast,
} from '@chakra-ui/react';
import type { Mading, User } from '@prisma/client';
import CreateUserModal from 'components/admin/createUserModal';
import Sidebar from 'components/admin/sidebar';
import Loading from 'components/loading';
import useWarning from 'components/warningModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const AdminUser = () => {
  const { warning, WarningModal } = useWarning();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
  const [madings, setMadings] = useState<Mading[]>();
  const [tags, setTags] = useState<string[]>();
  const [selectedMading, setSelectedMading] = useState<string>();
  const [formData, setFormData] = useState<{
    title: string;
    tag: string;
    image: undefined | File;
  }>({
    title: '',
    tag: '',
    image: undefined,
  });
  const [formUpdateData, setFormUpdateData] = useState<{
    title: string;
    tag: string;
    image: undefined | File;
  }>({
    title: '',
    tag: '',
    image: undefined,
  });
  const toast = useToast();

  useEffect(() => {
    fetch('/api/admin/mading', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setMadings(data);
      });
    });

    fetch('/api/admin/tag', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setTags(data.map((tag: { name: string }) => tag.name));
      });
    });
  }, []);

  const handleSubmitCreate = () => {
    if (formData.title === '' || formData.tag === '' || formData.image === undefined) {
      toast({
        title: 'Error',
        description: 'Please fill all the fields',

        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      const req = new FormData();
      req.append('title', formData.title);
      req.append('tag', formData.tag);
      req.append('file', formData.image);
      fetch('/api/admin/mading', {
        method: 'POST',
        body: req,
      }).then((res) => {
        if (res.status === 200) {
          router.reload();
        } else {
          toast({
            title: 'Gagal',
            description: 'Gagal menambahkan mading',
            status: 'error',
          });
        }
      });
    }
  };

  const handleOpenEdit = (mading: Mading) => {
    setSelectedMading(mading.id);
    setFormUpdateData({
      title: mading.title,
      tag: mading.tagName,
      image: undefined,
    });
    onOpenEdit();
  };

  const handleSubmitUpdate = () => {
    const req = new FormData();
    if (formUpdateData.title !== '') {
      req.append('title', formUpdateData.title);
    }
    if (formUpdateData.tag !== '') {
      req.append('tag', formUpdateData.tag);
    }
    if (formUpdateData.image !== undefined) {
      req.append('file', formUpdateData.image);
    }
    req.append('id', selectedMading || '');
    fetch(`/api/admin/mading`, {
      method: 'PUT',
      body: req,
    }).then((res) => {
      if (res.status === 200) {
        router.reload();
      } else {
        toast({
          title: 'Gagal',
          description: 'Gagal mengubah mading',
          status: 'error',
        });
      }
    });
  };

  const [isSmallScreen] = useMediaQuery('(max-width: 768px)');

  if (!madings || !tags) {
    return <Loading />;
  }

  return (
    <Flex flexDir="row" w="100%" bg="primary.100">
      <WarningModal />
      <Sidebar />
      {/* Chakra ui modal to input title, tag, and images */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Mading</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <InputGroup flexDir="column">
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </InputGroup>
              <InputGroup flexDir="column">
                <FormLabel>Tag</FormLabel>
                <Select
                  placeholder="Select tag"
                  onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup flexDir="column">
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] })}
                />
              </InputGroup>
              <Button mb={4} colorScheme="blue" mr={3} onClick={handleSubmitCreate}>
                Create
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpenEdit} onClose={onCloseEdit} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Mading</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex flexDir="column" gap={4}>
              <InputGroup flexDir="column">
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title"
                  onChange={(e) => setFormUpdateData({ ...formUpdateData, title: e.target.value })}
                  value={formUpdateData.title}
                />
              </InputGroup>
              <InputGroup flexDir="column">
                <FormLabel>Tag</FormLabel>
                <Select
                  placeholder="Select tag"
                  onChange={(e) => setFormUpdateData({ ...formUpdateData, tag: e.target.value })}
                  value={formUpdateData.tag}
                >
                  {tags.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Select>
              </InputGroup>
              <InputGroup flexDir="column">
                <FormLabel>Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormUpdateData({ ...formUpdateData, image: e.target.files?.[0] })
                  }
                />
              </InputGroup>
              <Button mb={4} colorScheme="blue" mr={3} onClick={handleSubmitUpdate}>
                Update
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
      <Flex w="100%" maxH="100vh" gap={2} px={2} flexDir="column">
        <Flex maxH="15vh" gap={2} pt={4} flexDir="column" position="sticky">
          <Flex gap={4}>
            <Center>
              <Heading size={isSmallScreen ? 'lg' : 'xl'}>Mading</Heading>
            </Center>
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
        <SimpleGrid minChildWidth="300px" spacing="40px" p={4}>
          {madings.map((mading) => (
            <Flex flexDir="column" key={mading.imageId}>
              <Flex flexDir="column" gap={2}>
                <Heading maxWidth="20ch" size="md">
                  {mading.title}
                </Heading>
                <Text>{mading.tagName}</Text>
              </Flex>
              {/* Box bounded image 300px 300px */}
              <Box
                minW="300px"
                minH="300px"
                bgImage={`https://drive.google.com/uc?export=view&id=${mading.imageId}`}
                bgSize="cover"
                bgPosition="center"
                bgRepeat="no-repeat"
                borderRadius="md"
                boxShadow="md"
                cursor="pointer"
              />

              <Flex flexDir="row" gap={2} mt={2}>
                <Button colorScheme="primary" variant="link">
                  <EditIcon
                    onClick={() => {
                      handleOpenEdit(mading);
                    }}
                  />
                </Button>
                <Button
                  colorScheme="primary"
                  variant="link"
                  onClick={() => {
                    warning({
                      title: 'Are you sure?',
                      description: 'This action cannot be undone',
                      onConfirm: () => {
                        fetch(`/api/admin/mading/delete`, {
                          method: 'DELETE',
                          body: JSON.stringify({ id: mading.id }),
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        }).then((res) => {
                          if (res.status === 200) {
                            router.reload();
                          } else {
                            toast({
                              title: 'Gagal',
                              description: 'Gagal menghapus mading',
                              status: 'error',
                            });
                          }
                        });
                      },
                    });
                  }}
                >
                  <DeleteIcon />
                </Button>
              </Flex>
            </Flex>
          ))}
        </SimpleGrid>
      </Flex>
    </Flex>
  );
};

export default AdminUser;
