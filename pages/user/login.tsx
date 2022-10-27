import {
  Button,
  Center,
  Flex,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { base64ToUint8Array } from '@libs/util';
import Link from 'components/link';
import Navbar from 'components/navbar';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    nim: '',
    password: '',
  });
  const toast = useToast();
  const router = useRouter();
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  const handleLogin = () => {
    signIn('credentials', {
      redirect: false,
      nim: formData.nim,
      password: formData.password,
    }).then((res) => {
      if (res) {
        if (res.error) {
          // Push toast if error
          if (res.status == 401) {
            toast({
              title: 'Login gagal',
              description: 'NIM atau password salah',
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          } else {
            toast({
              title: 'Login gagal',
              description: res.error,
              status: 'error',
              duration: 5000,
              isClosable: true,
            });
          }
        } else {
          if (res.status == 200) {
            subscribe().finally(() => {
              router.push('/');
            });
          }
        }
      }
    });
  };

  const subscribe = async () => {
    if (!subscription && registration) {
      const sub = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY),
      });
      setSubscription(sub);
      await fetch('/api/user/pwa/subscribe', {
        method: 'POST',
        body: JSON.stringify(sub),
      }).then((res) => res.json());
    } else {
      if (subscription) {
        await fetch('/api/user/pwa/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription),
        }).then((res) => res.json());
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub: any) => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub);
          }
        });
        setRegistration(reg);
      });
    }
  }, []);

  return (
    <>
      <Navbar />
      <Center bgImage="/images/bg_krem.png" h="100vh" w="100vw">
        <VStack px={8} w="40%" minWidth="400px">
          <Heading mb={4} size="2xl" textAlign="center">
            Welcome Back!
          </Heading>
          <Text fontFamily="Harmattan">Please log in to continue</Text>
          <InputGroup flexDir="column">
            <FormLabel color="brown.300">NIM</FormLabel>
            <Input
              sx={{
                _hover: {
                  background: 'white',
                },
                _focus: {
                  background: 'white',
                },
                _placeholder: {
                  color: 'gray.300',
                },
              }}
              background="white"
              color="primary.500"
              placeholder="Enter your NIM"
              onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
            />
          </InputGroup>
          <InputGroup flexDir="column">
            <FormLabel color="brown.300">Password</FormLabel>
            <Input
              sx={{
                _hover: {
                  background: 'white',
                },
                _focus: {
                  background: 'white',
                },
                _placeholder: {
                  color: 'gray.300',
                },
              }}
              background="white"
              color="primary.500"
              placeholder="Enter your password"
              type="password"
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />
          </InputGroup>
          <Flex flexDir="row-reverse" w="100%">
            <Link fontSize="1.2rem" textDecor="underline" href="/user/register">
              Forgot Password
            </Link>
          </Flex>
          <Center w="100%">
            <Button onClick={handleLogin} bg="primary.500" color="primary.300">
              Login
            </Button>
          </Center>
        </VStack>
      </Center>
    </>
  );
};

export default Login;
