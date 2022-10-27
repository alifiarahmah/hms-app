import { Box, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import { useState } from 'react';

const contacts = [
  {
    name: 'Prodi Sipil',
    no: '(022) 250 4556',
  },
  {
    name: 'Tata Usaha Sipil (Pak Agus)',
    no: '+62 8190 2774 540',
  },
  {
    name: 'Tata Usaha Sipil (Ibu Tika)',
    no: '+62 8586 4882 552',
  },
];

const sekjen_carousel = [
  '/images/organogram/sekjen.png',
  '/images/organogram/dept_medkominfo.png',
  '/images/organogram/bendahara_umum.png',
  '/images/organogram/sekre_umum.png',
  '/images/organogram/dept_tu.png',
  '/images/organogram/dept_relasi.png',
  '/images/organogram/dept_rm.png',
];

const internal_carousel = [
  '/images/organogram/wakahim_internal.png',
  '/images/organogram/dept_kesejahteraan.png',
  '/images/organogram/dept_minat.png',
];

const keprof_carousel = [
  '/images/organogram/wakahim_keprof.png',
  '/images/organogram/dept_keilmuan.png',
  '/images/organogram/dept_kompetisi.png',
  '/images/organogram/dept_karir.png',
];

const LeftButtonIcon = () => (
  <svg width="20" height="37" viewBox="0 0 20 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8.96083e-07 18.5L19.5 36.2535L19.5 0.746478L8.96083e-07 18.5Z" fill="#175442" />
  </svg>
);

const RightButtonIcon = () => (
  <svg width="20" height="37" viewBox="0 0 20 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 18.5L0.5 36.2535L0.500002 0.746478L20 18.5Z" fill="#175442" />
  </svg>
);

const About = () => {
  const [sekjen, setSekjen] = useState(0);
  const [internal, setInternal] = useState(0);
  const [keprof, setKeprof] = useState(0);

  return (
    <Layout bg="/images/bg_pattern.png">
      <Stack
        p={{ base: 5, lg: 10 }}
        direction={{ base: 'column', lg: 'row' }}
        alignItems="center"
        gap={5}
      >
        <Image
          my={10}
          src="/images/logo.png"
          alt="Logo HMS ITB"
          width={{ base: '50%', lg: 'auto' }}
        />
        <Box>
          <Heading color="#175442" mb={10}>
            Himpunan Mahasiswa Sipil
          </Heading>
          <Text color="#1F1B1F" mt={3}>
            Himpunan Mahasiswa Sipil Institut Teknologi Bandung (HMS ITB) merupakan organisasi yang
            menaungi mahasiswa S1 teknik sipil ITB. Himpunan yang terbentuk pada 30 Mei 1954 ini
            berdiri untuk waktu yang tidak ditentukan dan memiliki ciri khas identitas berupa jaket
            hijau tua dengan logo atau lambang di bagian dada sebelah kirinya. Logo HMS ITB adalah
            gambar seorang ahli Teknik Sipil, yang memakai helm pengaman proyek, dengan latar
            belakang konstruksi yang selesai dibangun di dalam sebuah lingkaran, dan dikelilingi
            oleh tulisan HIMPUNAN MAHASISWA SIPIL ITB. Selain itu, HMS ITB juga memiliki bendera
            yang berwarna hitam dengan gambar lambang himpunan yang berwarna kuning.
          </Text>
          <Text color="#1F1B1F" mt={3}>
            HMS ITB bukan sekedar apa yang dipandang dan yang dikisahkan, melainkan setiap
            pergerakan, juga kebersamaan. Dengan semangat no 1 sebagai jati diri, HMS ITB akan terus
            hidup sesuai kebutuhan zaman, sampai waktu yang diharapkan tak berkesudahan.
          </Text>
        </Box>
      </Stack>
      <Box my={{ base: 5, lg: 10 }} ml={{ base: 5, lg: 10 }}>
        <Heading color="#175442">Organogram</Heading>
        <Stack
          my={10}
          direction={{ base: 'column', lg: 'row' }}
          alignItems="center"
          overflowX="scroll"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
          gap={2}
        >
          <Image src="/images/organogram/kahim.png" alt="Ketua Himpunan" />
          <Flex alignItems="center">
            <IconButton
              onClick={() => (sekjen - 1 >= 0 ? setSekjen(sekjen - 1) : setSekjen(0))}
              variant="ghost"
              aria-label="previous"
              icon={<LeftButtonIcon />}
              mr={-10}
            />
            <Box w="277px" h="277px">
              <Image src={sekjen_carousel[sekjen]} alt="Sekretaris Jenderal" />
            </Box>
            <IconButton
              onClick={() =>
                sekjen + 1 < sekjen_carousel.length
                  ? setSekjen(sekjen + 1)
                  : setSekjen(sekjen_carousel.length - 1)
              }
              variant="ghost"
              aria-label="next"
              icon={<RightButtonIcon />}
              ml={-10}
            />
          </Flex>
          <Flex alignItems="center">
            <IconButton
              onClick={() => (internal - 1 >= 0 ? setInternal(internal - 1) : setInternal(0))}
              variant="ghost"
              aria-label="previous"
              icon={<LeftButtonIcon />}
              mr={-10}
            />
            <Box w="277px" h="277px">
              <Image src={internal_carousel[internal]} alt="Wakil Ketua Himpunan Bidang Internal" />
            </Box>
            <IconButton
              onClick={() =>
                internal + 1 < internal_carousel.length
                  ? setInternal(internal + 1)
                  : setInternal(internal_carousel.length - 1)
              }
              variant="ghost"
              aria-label="next"
              icon={<RightButtonIcon />}
              ml={-10}
            />
          </Flex>
          <Flex alignItems="center">
            <IconButton
              onClick={() => (keprof - 1 >= 0 ? setKeprof(keprof - 1) : setKeprof(0))}
              variant="ghost"
              aria-label="previous"
              icon={<LeftButtonIcon />}
              mr={-10}
            />
            <Box w="277px" h="277px">
              <Image src={keprof_carousel[keprof]} alt="Wakil Ketua Himpunan Bidang Keprofesian" />
            </Box>
            <IconButton
              onClick={() =>
                keprof + 1 < keprof_carousel.length
                  ? setKeprof(keprof + 1)
                  : setKeprof(keprof_carousel.length - 1)
              }
              variant="ghost"
              aria-label="next"
              icon={<RightButtonIcon />}
              ml={-10}
            />
          </Flex>
          <Image src="/images/organogram/dept_kemasyarakatan.png" alt="Sekretaris Jenderal" />
          <Image src="/images/organogram/dept_orgdev.png" alt="Sekretaris Jenderal" />
        </Stack>
      </Box>
      <Box m={{ base: 5, lg: 10 }} overflowX="scroll">
        <Heading color="#175442">Contact</Heading>
        <Stack my={10} gap={5}>
          {contacts.map((contact, index) => (
            <Stack key={index} direction="row">
              <svg
                width="59"
                height="59"
                viewBox="0 0 59 59"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.5822 10.6534L35.1982 17.0432L42.1584 23.9976L41.6975 25.2421C40.3114 29.0161 38.1213 32.4435 35.2789 35.287C32.4364 38.1304 29.0097 40.3217 25.2362 41.7091L23.9917 42.17L23.9398 42.1182L17.0373 35.2041L10.6533 41.5938L16.6743 47.6148C17.2966 48.2313 18.1724 48.5194 19.0251 48.3754C25.8182 47.2518 32.5882 43.5989 38.0906 38.0965C43.5931 32.594 47.246 25.8183 48.3695 19.0252C48.5136 18.1725 48.2255 17.2967 47.6032 16.6744L41.5822 10.6534Z"
                  fill="#96B29E"
                />
                <path
                  d="M50.536 13.7532L44.3998 7.62275C43.6508 6.87373 42.6482 6.45312 41.5881 6.45312C40.5279 6.45312 39.5254 6.86797 38.7764 7.62275L32.1677 14.2199C31.4187 14.9689 30.998 15.9772 30.998 17.0374C30.998 18.1033 31.4129 19.1001 32.1677 19.8549L37.3302 25.0231C36.1541 27.7633 34.4643 30.253 32.352 32.3578C30.2375 34.4839 27.7657 36.1605 25.0231 37.3475L19.8606 32.1792C19.1116 31.4302 18.1091 31.0096 17.0489 31.0096C16.526 31.0076 16.008 31.1101 15.5252 31.3109C15.0423 31.5118 14.6045 31.807 14.2372 32.1792L7.62275 38.7764C6.87373 39.5254 6.45312 40.5337 6.45312 41.5938C6.45312 42.6598 6.86797 43.6565 7.62275 44.4113L13.7532 50.5418C15.0323 51.8209 16.7954 52.5526 18.6046 52.5526C18.9791 52.5526 19.3421 52.5238 19.7108 52.4604C27.3394 51.2044 34.9103 47.1424 41.0234 41.035C47.1309 34.916 51.1871 27.3451 52.4547 19.7108C52.8177 17.5444 52.0917 15.3146 50.536 13.7532V13.7532ZM48.3696 19.0252C47.2461 25.8183 43.5932 32.594 38.0907 38.0965C32.5883 43.5989 25.8183 47.2519 19.0252 48.3754C18.1725 48.5194 17.2967 48.2313 16.6744 47.6148L10.6534 41.5938L17.0374 35.2041L23.9399 42.1182L23.9918 42.17L25.2363 41.7091C29.0098 40.3217 32.4365 38.1304 35.2789 35.287C38.1214 32.4436 40.3115 29.0161 41.6976 25.2421L42.1585 23.9976L35.1983 17.0432L41.5823 10.6534L47.6033 16.6744C48.2256 17.2967 48.5137 18.1725 48.3696 19.0252Z"
                  fill="#175442"
                />
              </svg>
              <Box>
                <Text ml={3} color="black" fontWeight="semibold">
                  {contact.name}
                </Text>
                <Text ml={3} color="black">
                  {contact.no}
                </Text>
              </Box>
            </Stack>
          ))}
        </Stack>
      </Box>
    </Layout>
  );
};

export default About;
