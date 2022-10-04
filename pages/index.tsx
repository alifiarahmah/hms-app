import { Box, Button, Heading, HStack, Stack, Text } from '@chakra-ui/react';
import Layout from 'components/layout';
import Link from 'components/link';
import { useSession } from 'next-auth/react';

const Index = () => {
  const session = useSession();
  return (
    <Layout>
      {session.status === 'authenticated' ? (
        <Heading>Hello, {session.data?.user?.name}</Heading>
      ) : null}
      <Heading fontSize={session.status === 'authenticated' ? 'xl' : '2xl'}>
        Upcoming Events
      </Heading>
      <Stack py={5}>
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <Box key={i}>
              <Text fontWeight="bold">Event {i}</Text>
              <HStack justifyContent="space-between">
                <Text>DD-MM-YY HH:MM</Text>
                <Text>Medkominfo</Text>
              </HStack>
              <Text>Lorem ipsum dolor sit amet</Text>
              <Link href="https://google.com" isExternal>
                <Button>Join Meeting</Button>
              </Link>
            </Box>
          );
        })}
      </Stack>
    </Layout>
  );
};

export default Index;
