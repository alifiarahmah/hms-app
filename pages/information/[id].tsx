import { Box, Center, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import Link from 'components/link';
import { useRouter } from 'next/router';

export const Information = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
      <Flex minH="100vh">
        <Box px={5} py={10} w="75vw">
          <Text fontFamily="Gurindam" fontSize="sm" color="#175442">
            Kesekjenan / Judul
          </Text>
          <Heading color="#1F1B1F" fontFamily="Gurindam" fontSize="2xl" mt={5}>
            JUDUL POSTINGJUDUL POSTINGJUDUL POSTINGJUDUL POSTINGJUDUL POSTING #{id}
          </Heading>
          <Text color="#1F1B1F" my={3}>
            dd month yyyy
          </Text>
          <Center my={5}>
            <Image src="http://source.unsplash.com/random/700x500" alt="" />
          </Center>
          <Text fontSize="md" color="#1F1B1F">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus convallis egestas
            urna, nisl, enim. Non euismod cursus maecenas vitae ipsum et. Pretium amet, eget posuere
            ultricies odio aliquam nec, eu dolor. Cursus ac lorem leo eleifend. Nisl, ullamcorper
            sagittis erat pellentesque rhoncus nunc. Risus vitae, augue interdum massa feugiat lorem
            mauris vel feugiat. Pretium mi urna at feugiat et sollicitudin purus arcu ut. Risus et
            tellus vel facilisi. Sagittis adipiscing aliquam, nibh id. Platea nulla nulla enim eget
            volutpat. Massa purus turpis mauris amet sed egestas elementum nunc. Non accumsan enim
            cursus venenatis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus
            convallis egestas urna, nisl, enim. Non euismod cursus maecenas vitae ipsum et. Pretium
            amet, eget posuere ultricies odio aliquam nec, eu dolor. Cursus ac lorem leo eleifend.
            Nisl, ullamcorper sagittis erat pellentesque rhoncus nunc. Risus vitae, augue interdum
            massa feugiat lorem mauris vel feugiat. Pretium mi urna at feugiat et sollicitudin purus
            arcu ut. Risus et tellus vel facilisi. Sagittis adipiscing aliquam, nibh id. Platea
            nulla nulla enim eget volutpat. Massa purus turpis mauris amet sed egestas elementum
            nunc. Non accumsan enim cursus venenatis. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Faucibus convallis egestas urna, nisl, enim. Non euismod cursus
            maecenas vitae ipsum et. Pretium amet, eget posuere ultricies odio aliquam nec, eu
            dolor. Cursus ac lorem leo eleifend. Nisl, ullamcorper sagittis erat pellentesque
            rhoncus nunc. Risus vitae, augue interdum massa feugiat lorem mauris vel feugiat.
            Pretium mi urna at feugiat et sollicitudin purus arcu ut. Risus et tellus vel facilisi.
            Sagittis adipiscing aliquam, nibh id. Platea nulla nulla enim eget volutpat. Massa purus
            turpis mauris amet sed egestas elementum nunc. Non accumsan enim cursus venenatis. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. Faucibus convallis egestas urna,
            Massa purus turpis mauris amet sed egestas elementum nunc. Non accumsan enim cursus
            venenatis
          </Text>
        </Box>
        <Box px={5} py={10} bg="#F5D2BF" w="25vw">
          <Heading mb={3} fontSize="md">
            Newest Post
          </Heading>
          {Array.from({ length: 5 }).map((_, i) => (
            <Link key={i} href={`/information/${i}`}>
              <Flex bg="white" color="#1F1B1F" my={5} overflowX="hidden">
                <Image src="http://source.unsplash.com/random/100x70" alt="" />
                <Box p={2}>
                  <Text fontSize="sm">dd mm yy</Text>
                  <Text noOfLines={1}>Judul</Text>
                </Box>
              </Flex>
            </Link>
          ))}
        </Box>
      </Flex>
    </Layout>
  );
};

export default Information;
