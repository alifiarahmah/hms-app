import { Button, Flex, Heading, Input, SimpleGrid, Spacer, Text, useToast } from '@chakra-ui/react';
import { EditProfileReqType } from '@schemas/request';
import Layout from 'components/layout';
import Loading from 'components/loading';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Profile = () => {
  const { status } = useSession();
  const [isEditable, setIsEditable] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    nim: '',
    password: '',
  });
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    fetch('/api/user/profile', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => {
        const { data } = res;
        setUserData({ ...data, password: '' });
      })
      .catch((err) => {
        router.reload();
      });
  }, [router]);

  if (status === 'unauthenticated') {
    router.push('/');
  }

  if (status !== 'authenticated' || !userData.nim) {
    return <Loading />;
  }

  const handleSubmit = async () => {
    const data: EditProfileReqType = {};
    data.name = userData.name;
    data.email = userData.email;
    if (userData.password) {
      data.password = userData.password;
    }
    const res = await fetch('/api/user/profile', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    if (res.isError) {
      toast({
        title: 'Gagal mengubah data',
        description: res.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } else {
      router.reload();
    }
    setIsEditable(false);
  };

  return (
    <Layout>
      <Flex flexDir="column" gap={8}>
        <Heading>Profile</Heading>
        <SimpleGrid columns={2} gap={4}>
          <Heading size="xs">Nama</Heading>
          {isEditable ? (
            <Input
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              variant="outline"
              borderColor="primary.500"
              value={userData.name}
            />
          ) : (
            <Text>{userData.name}</Text>
          )}
          <Heading size="xs">Email</Heading>
          {isEditable ? (
            <Input
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              variant="outline"
              borderColor="primary.500"
              value={userData.email}
            />
          ) : (
            <Text>{userData.email}</Text>
          )}
          <Heading size="xs">Password</Heading>
          {isEditable ? (
            <Input
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              variant="outline"
              borderColor="primary.500"
              value={userData.password}
            />
          ) : (
            <Text>-</Text>
          )}
        </SimpleGrid>
      </Flex>
      <Flex>
        <Spacer />
        {isEditable ? (
          <Button colorScheme="blue" onClick={handleSubmit}>
            Save
          </Button>
        ) : (
          <Button colorScheme="primary" onClick={() => setIsEditable(true)}>
            Edit
          </Button>
        )}
      </Flex>
    </Layout>
  );
};

export default Profile;
