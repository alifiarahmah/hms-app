import {
  Button,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { base64ToUint8Array } from '@libs/util';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = ({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const session = useSession();

  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  const router = useRouter();
  const [formData, setFormData] = useState({
    nim: '',
    password: '',
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!registration) {
      return;
    }
    const res = await signIn('credentials', {
      redirect: false,
      nim: formData.nim,
      password: formData.password,
    });
    if (res) {
      if (res.error) {
        // Push toast if error
        toast({
          title: 'Login gagal',
          description: res.error,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        if (!subscription) {
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
          await fetch('/api/user/pwa/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
          }).then((res) => res.json());
        }
        toast({
          title: 'Login berhasil',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
        router.push('/');
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
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Login</ModalHeader>
        <ModalCloseButton />
        <form>
          <ModalBody>
            <Stack direction="column">
              <Input
                placeholder="NIM"
                onChange={(e) => setFormData({ ...formData, nim: e.target.value })}
              />
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </Stack>
          </ModalBody>

          <ModalFooter display="flex">
            <Button type="submit" onClick={handleSubmit}>
              Log In
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
};

export default Login;
