import { Heading, Stack, Text } from '@chakra-ui/react';
import { organogram } from 'components/about/organogram';
import Layout from 'components/layout';

interface organogramItem {
  title?: string;
  name?: string;
  nim?: string;
  children?: organogramItem[];
}

const About = () => {
  return (
    <Layout title="About HMS">
      <section>
        <p>
          Himpunan Mahasiswa Sipil ITB (HMS ITB) merupakan organisasi kemahasiswaan yang berada pada
          tingkat jurusan atau program studi teknik sipil ITB. HMS ITB selalu berkomitmen untuk
          memenuhi kebutuhan anggotanya melalui wadah-wadah yang dirancang dari, oleh, dan untuk
          anggota HMS ITB itu sendiri
        </p>
      </section>
      <section>
        <Heading as="h2" mt={5} mb={3}>
          Organogram BP
        </Heading>
        {organogram.map((o: organogramItem, i) => (
          <Stack my={5} key={i}>
            <Heading fontSize="xl">{o.title}</Heading>
            {o.name && (
              <Text fontSize="xl">
                {o.name} ({o.nim})
              </Text>
            )}
            {o.children?.map((c1, j) => (
              <Stack pl={5} key={j}>
                <Heading fontSize="lg">{c1.title}</Heading>
                {c1.name && (
                  <Text fontSize="xl">
                    {c1.name} ({c1.nim})
                  </Text>
                )}
                {c1.children?.map((c2, k) => (
                  <Stack pl={5} key={k}>
                    {c2.name && (
                      <Text fontSize="xl">
                        {c2.name} ({c2.nim})
                      </Text>
                    )}
                  </Stack>
                ))}
              </Stack>
            ))}
          </Stack>
        ))}
      </section>
    </Layout>
  );
};

export default About;
