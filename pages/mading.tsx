import {
  Button,
  ButtonGroup,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import Layout from 'components/layout';

const Gallery = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Layout title="Mading">
        <ButtonGroup py={5}>
          <Button>Kesekjenan</Button>
          <Button>Medkominfo</Button>
          <Button>Internal</Button>
          <Button>Kemasyarakatan</Button>
          <Button>Keprofesian</Button>
          <Button>Organization Development</Button>
        </ButtonGroup>
        <SimpleGrid py={5} columns={{ base: 1, md: 2, lg: 3 }} spacing={10} mx={20} my={10}>
          {Array.from({ length: 15 }).map((_, i) => (
            <Image
              cursor="pointer"
              onClick={onOpen}
              key={i}
              alt="random"
              src="https://source.unsplash.com/random"
            />
          ))}
        </SimpleGrid>

        <Stack direction="row" justifyContent="center" alignItems="center">
          <Button isDisabled>First</Button>
          <Button isDisabled>Prev</Button>
          <Text px={5}>1/10</Text>
          <Button>Next</Button>
          <Button>Last</Button>
        </Stack>
      </Layout>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Random Image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image alt="random" src="https://source.unsplash.com/random" mb={5} />
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque eget nulla sit amet
              quam lacinia hendrerit
            </Text>
          </ModalBody>

          <ModalFooter>
            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Download
            </Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Gallery;
