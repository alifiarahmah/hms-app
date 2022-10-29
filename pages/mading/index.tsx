/* eslint-disable react-hooks/exhaustive-deps */
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
import { MadingCard } from 'components/cards';
import DeptNavigation from 'components/dept_navigation';
import Layout from 'components/layout';
import Loading from 'components/loading';
import { useEffect, useState } from 'react';

interface Mading {
  id: string;
  imageId: string;
  tagName: string;
  title: string;
}

export const Mading = () => {
  const [selectedDept, setSelectedDept] = useState('all');
  const [selectedPostId, setSelectedPostId] = useState('');
  const [ascSort, setAscSort] = useState(false);
  const [fullMading, setFullMading] = useState<Mading[]>([]);
  const [mading, setMading] = useState<Mading[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (id: string) => {
    setSelectedPostId(id);
    onOpen();
  };

  useEffect(() => {
    fetch('/api/user/mading', {
      method: 'GET',
    }).then((res) => {
      res.json().then(({ data }) => {
        setMading(data);
        setFullMading(data);
      });
    });
  }, []);

  useEffect(() => {
    if (selectedDept == 'all') {
      setMading(fullMading);
    } else {
      setMading(
        fullMading.filter((item) => item.tagName.toLowerCase() == selectedDept.toLowerCase())
      );
    }
  }, [selectedDept]);

  useEffect(() => {
    if (ascSort) {
      const sorted = mading.sort((a, b) => {
        // b.title - a.title kudunya, TAPI MALAH ERROR
        return a.title.localeCompare(b.title);
      });
      setMading(sorted);
    } else {
      const sorted = mading.sort((a, b) => {
        // b.title - a.title kudunya, TAPI MALAH ERROR
        return b.title.localeCompare(a.title);
      });
      setMading(sorted);
    }
  }, [ascSort]);

  if (!mading) {
    return <Loading />;
  }

  return (
    <>
      <Layout bg="/images/bg_krem.png">
        <DeptNavigation
          selectedDept={selectedDept}
          setSelectedDept={setSelectedDept}
          ascSort={ascSort}
          setAscSort={setAscSort}
        />
        <SimpleGrid p={7} columns={{ base: 1, sm: 2, md: 3, lg: 4 }} rowGap={5} columnGap={5}>
          {mading.map((item) => (
            <MadingCard
              key={item.id}
              image={`https://drive.google.com/uc?export=view&id=${item.imageId}`}
              onClick={() => handleOpen(item.id)}
            />
          ))}
        </SimpleGrid>
      </Layout>

      {/* TODO: make modal bigger */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0} w="fit-content" alignSelf="center">
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
