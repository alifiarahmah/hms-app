import { CheckIcon, ChevronLeftIcon, EditIcon } from '@chakra-ui/icons';
import {
  Center,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { User } from '@prisma/client';
import Loading from 'components/loading';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SingleUser = () => {
  const router = useRouter();
  const toast = useToast();
  const [userData, setUserData] = useState<null | User>(null);
  const [isEditable, setIsEditable] = useState({
    name: false,
    email: false,
    password: false,
  });

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetch(`/api/admin/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          data.data.password = '';
          setUserData(data.data);
        })
        .catch((err) => {
          router.push('/admin/user');
        });
    }
  }, [id, router]);

  type Editable = 'name' | 'email' | 'password';
  const handleChangeEditable = (input: Editable) => {
    if (isEditable[input] && userData) {
      fetch(`/api/admin/user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: 'Berhasil',
              description: 'Data user berhasil diubah',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
          }
        })
        .catch((err) => {
          toast({
            title: 'Gagal',
            description: 'Data user gagal diubah',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }

    setIsEditable((prev) => ({
      ...prev,
      [input]: !prev[input],
    }));
    if (input === 'password' && userData) {
      setUserData({
        ...userData,
        password: '',
      });
    }
  };

  if (!userData) {
    return <Loading />;
  }

  return (
    <Center w="100%" h="100%">
      <VStack my={8} borderRadius="xl" w="360px" bg="primary.500">
        <VStack color="white" w="100%" borderRadius="xl" p={4} bg="primary.500">
          <IconButton
            aria-label="back button"
            icon={<ChevronLeftIcon boxSize={8} />}
            variant="ghost"
            colorScheme="primary"
            position="absolute"
            transform={'translate(calc(50% - 180px), 25%)'}
            onClick={() => router.push('/admin/user')}
          />
          <Heading>{userData.nim}</Heading>
          <Divider />
        </VStack>
        <VStack w="100%" p={4} bg="white" borderBottomRadius="xl" color="black">
          <FormControl>
            <FormLabel>
              <Heading size="xs">Nama</Heading>
            </FormLabel>
            <InputGroup>
              <Input
                value={userData.name}
                borderColor="transparent"
                disabled={!isEditable.name}
                fontWeight="bold"
                onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              />
              <InputRightElement>
                <IconButton
                  aria-label="edit name"
                  colorScheme="primary"
                  icon={isEditable.name ? <CheckIcon /> : <EditIcon />}
                  onClick={() => handleChangeEditable('name')}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>
              <Heading size="xs">Email</Heading>
            </FormLabel>
            <InputGroup>
              <Input
                value={userData.email}
                borderColor="transparent"
                disabled={!isEditable.email}
                fontWeight="bold"
                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              />
              <InputRightElement>
                <IconButton
                  aria-label="edit email"
                  colorScheme="primary"
                  icon={isEditable.email ? <CheckIcon /> : <EditIcon />}
                  onClick={() => handleChangeEditable('email')}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <FormControl>
            <FormLabel>
              <Heading size="xs">Password</Heading>
            </FormLabel>
            <InputGroup>
              <Input
                value={userData.password}
                borderColor="transparent"
                disabled={!isEditable.password}
                fontWeight="bold"
                onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              />
              <InputRightElement>
                <IconButton
                  aria-label="edit password"
                  colorScheme="primary"
                  icon={isEditable.password ? <CheckIcon /> : <EditIcon />}
                  onClick={() => handleChangeEditable('password')}
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
        </VStack>
      </VStack>
    </Center>
  );
};

export default SingleUser;
