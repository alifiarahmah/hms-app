import {
  Box,
  Heading,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import DeptNavigation from 'components/dept_navigation';
import Layout from 'components/layout';
import { useState } from 'react';

export const Mading = () => {
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedPostId, setSelectedPostId] = useState(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (id: number) => {
    setSelectedPostId(id);
    onOpen();
  };

  return (
    <>
      <Layout bg="/images/bg_krem.png">
        <DeptNavigation selectedDept={selectedDept} setSelectedDept={setSelectedDept} />
        <SimpleGrid p={7} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} rowGap={5} columnGap={5}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Box key="" onClick={() => handleOpen(i)} bg="white" color="#1F1B1F">
              <Image src="http://source.unsplash.com/random/300x200" alt="" h="200px" />
            </Box>
          ))}
        </SimpleGrid>
      </Layout>

      {/* TODO: make modal bigger */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={0}>
            <HStack bgImage="/images/bg_pink.png">
              <Box
                h="80vh"
                w="1000px"
                bgImage="https://via.placeholder.com/1920x1080"
                bgSize="cover"
                bgPosition="center"
              />
              <Box m={10} ml={5} w="500px">
                <Text color="#1F1B1F">dd mm yy</Text>
                <Heading color="#1F1B1F">Title {selectedPostId}</Heading>
                <Text color="#1F1B1F" mt={3}>
                  Content
                </Text>
              </Box>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mading;
