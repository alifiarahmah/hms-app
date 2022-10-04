import {
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react';
import { CreateSingleUserSchema } from '@schemas/request';
import { useState } from 'react';
import { ZodError } from 'zod';

interface CreateUserModalProps {
  isOpen: boolean;
  onOpen?: () => void;
  onClose: () => void;
}

// User : nim, name, email, password
// Modal with forms to create a new user
const CreateUserModal = ({ isOpen, onOpen, onClose }: CreateUserModalProps) => {
  const toast = useToast();
  const [user, setUser] = useState({
    nim: '',
    name: '',
    email: '',
    password: '',
  });
  const handleChangeUser = (field: string, value: string) => {
    setUser({
      ...user,
      [field]: value,
    });
  };
  const handleSubmit = () => {
    console.log(user);
    try {
      CreateSingleUserSchema.parse(user);
      fetch('/api/admin/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: 'Berhasil',
              description: 'User berhasil dibuat',
              status: 'success',
              duration: 3000,
              isClosable: true,
            });
            onClose();
          }
        })
        .catch((err) => {
          toast({
            title: 'Gagal',
            description: 'User gagal dibuat',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    } catch (e: any) {
      let err: ZodError = e;
      err.errors.map((value) => {
        if (toast.isActive(`${value.path}`)) {
          toast.update(`${value.path}`, {
            description: `${value.path}: ${value.message}`.replaceAll('String', 'Input'),
            status: 'error',
          });
        } else {
          toast({
            id: `${value.path}`,
            description: `${value.path}: ${value.message}`.replaceAll('String', 'Input'),
            status: 'error',
          });
        }
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p={4} pt={8} gap={4}>
        {['NIM', 'Name', 'Email', 'Password'].map((item: string, idx) => {
          return (
            <FormControl key={idx}>
              <FormLabel>
                <Heading size="xs">{item}</Heading>
              </FormLabel>
              <Input
                value={(user as any)[item.toLowerCase()]}
                onChange={(e) => handleChangeUser(item.toLowerCase(), e.target.value)}
              />
            </FormControl>
          );
        })}
        <ModalFooter gap={4}>
          <Button colorScheme="red" onClick={onClose}>
            Cancel
          </Button>
          <Button colorScheme="primary" onClick={handleSubmit}>
            Create
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateUserModal;
