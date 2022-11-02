/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Flex,
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
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const [selectedMading, setSelectedMading] = useState<Mading>();
  const [idx, setIdx] = useState<number>(0);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleOpen = (item: Mading) => {
    setSelectedMading(item);
    setIdx(fullMading.findIndex((i) => i.id === item.id));
    onOpen();
  };

  const slideMading = (idxInc: number) => {
    const curIdx = idx + idxInc < 0 ? mading.length - 1 : (idx + idxInc) % mading.length;
    setIdx(curIdx);
    setSelectedMading(mading[curIdx]);
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
    setIdx(0);
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
              onClick={() => handleOpen(item)}
            />
          ))}
        </SimpleGrid>
      </Layout>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl' }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0} position="relative">
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="50%"
              left="0px"
              transform="translate(-200%, -50%)"
              _hover={{ opacity: 0.65 }}
              cursor="pointer"
              onClick={() => slideMading(-1)}
            >
              <FaChevronLeft size={50} color="#F2E1CD" />
            </Box>
            <Box
              display={{ base: 'none', lg: 'block' }}
              position="absolute"
              top="50%"
              right="0px"
              transform="translate(200%, -50%)"
              _hover={{ opacity: 0.65 }}
              cursor="pointer"
              onClick={() => slideMading(1)}
            >
              <FaChevronRight size={50} color="#F2E1CD" />
            </Box>
            <Flex flexDirection="row" bgImage="/images/bg_pink.png">
              <Box
                w={{ base: '100%', lg: '75%' }}
                h={{ base: '400px', lg: '500px' }}
                overflow="hidden"
                alignSelf="center"
              >
                <Image
                  src={`https://drive.google.com/uc?export=view&id=${selectedMading?.imageId}`}
                  alt="mading"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                />
              </Box>
              <Box m={10} ml={5} display={{ base: 'none', lg: 'unset' }}>
                <Heading color="#1F1B1F" flexWrap="wrap">
                  {selectedMading?.title}
                </Heading>
                <Text color="#1F1B1F" mt={3}>
                  {selectedMading?.tagName}
                </Text>
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Mading;
