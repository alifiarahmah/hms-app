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
  useToast,
} from '@chakra-ui/react';
import type { Post, Tag, User } from '@prisma/client';
import prisma from '@services/prisma';
import CreateUserModal from 'components/admin/createUserModal';
import Sidebar from 'components/admin/sidebar';
import Loading from 'components/loading';
import useWarning from 'components/warningModal';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// use getstatic props to get all post
export const getStaticProps = async () => {
  const postData = await prisma.post.findMany({
    include: {
      tags: true,
    },
  });
  return {
    props: {
      postData: JSON.parse(JSON.stringify(postData)),
    },
  };
};

type PostWithTags = Post & {
  tags: Tag[];
};

const AdminUser = ({ postData }: { postData: PostWithTags[] }) => {
  postData = postData.map((post) => {
    post.createdAt = new Date(post.createdAt);
    return post;
  });
  const { warning, WarningModal } = useWarning();
  const router = useRouter();
  const toast = useToast();

  const handleDeletePost = async (id: string) => {
    const res = await fetch(`/api/post`, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    if (res.status === 200) {
      router.reload();
    } else {
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex flexDir="row" w="100%" bg="primary.100">
      <WarningModal />
      <Sidebar />
      <Flex w="100%" maxH="100vh" gap={2} px={2} flexDir="column">
        <Flex maxH="15vh" gap={2} pt={4} flexDir="column" position="sticky">
          <Flex gap={8}>
            <Heading color="primary.500">Posts</Heading>
            <InputGroup borderColor="primary.500" mt={2}>
              <Input focusBorderColor="primary.500" />
              <InputRightAddon bg="transparent">
                <SearchIcon />
              </InputRightAddon>
            </InputGroup>
            <Button
              onClick={() => router.push('/admin/post/add')}
              mt={2}
              mr={4}
              colorScheme="primary"
              variant="link"
            >
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
                <Th>Title</Th>
                <Th>Tag</Th>
                <Th>Created At</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {postData.map((post: PostWithTags) => (
                <Tr key={post.id}>
                  <Td>{post.title}</Td>
                  <Td>{post.tags.map((tag) => tag.name).join(', ')}</Td>
                  <Td>{post.createdAt.toDateString()}</Td>
                  <Td>
                    <HStack>
                      <IconButton
                        aria-label="Edit"
                        icon={<EditIcon />}
                        onClick={() => router.push(`/admin/post/${post.id}`)}
                      />
                      <IconButton
                        aria-label="Delete"
                        icon={<DeleteIcon />}
                        onClick={() => {
                          warning({
                            title: 'Delete Post',
                            description: 'Are you sure you want to delete this post?',
                            onConfirm: () => handleDeletePost(post.id),
                          });
                        }}
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
