import { Box, Button, Heading, Input, SimpleGrid, Text, useToast } from '@chakra-ui/react';
import Layout from 'components/layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Profile = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const toast = useToast();
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(session?.user.name);
  const [editedEmail, setEditedEmail] = useState(session?.user.email);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (editMode) {
      const res = await fetch('/api/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: session?.user.id,
          name: editedName,
          email: editedEmail,
        }),
      });
      if (res.status === 200) {
        setEditMode(false);
        toast({
          title: 'Profile updated',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Profile update failed',
          description: res.statusText,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    } else {
      setEditMode(true);
    }
  };

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }
  return (
    <Layout>
      <Heading>Profile</Heading>
      <SimpleGrid columns={2} rowGap={6} py={10}>
        <Box>Name</Box>
        <Text display={editMode ? 'none' : 'block'}>{editedName}</Text>
        <Input
          display={editMode ? 'block' : 'none'}
          onChange={(e) => setEditedName(e.target.value)}
        />
        <Box>NIM</Box>
        <Text>{session?.user.nim}</Text>
        <Box>Email</Box>
        <Text display={editMode ? 'none' : 'block'}>{editedEmail}</Text>
        <Input
          type="email"
          display={editMode ? 'block' : 'none'}
          onChange={(e) => setEditedEmail(e.target.value)}
        />
        <Box>Password</Box>
        <Button>Change password</Button>
      </SimpleGrid>
      <Button onClick={handleSubmit}>{editMode ? 'Save' : 'Edit Account'}</Button>
    </Layout>
  );
};

export default Profile;
