import { Box, Button, Heading, SimpleGrid, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const Profile = () => {
  const session = useSession();
  const router = useRouter();
  const [editMode, setEditMode] = useState(false);

  if (session.status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  return (
    <Layout>
      <Heading>Profile</Heading>
      <SimpleGrid columns={2} rowGap={5} py={10}>
        <Box>Name</Box>
        <Text>{session.data?.user?.name}</Text>
        <Box>NIM</Box>
        <Text>13520000</Text>
        <Box>Email</Box>
        <Text>{session.data?.user?.email}</Text>
        <Box>Password</Box>
        <Button>Change password</Button>
      </SimpleGrid>
      <Button onClick={() => setEditMode(!editMode)}>{editMode ? 'Save' : 'Edit Account'}</Button>
    </Layout>
  );
};

export default Profile;
