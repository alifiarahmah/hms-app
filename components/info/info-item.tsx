import { Heading, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { IPost } from 'types/post';

interface InfoItem {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

const InfoItem = ({ id, title, content, createdAt }: IPost) => {
  return (
    <Link href={`/info/${id}`}>
      <Stack
        my={5}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        gap={10}
        w="100%"
      >
        <Stack>
          <Heading as="h2" size="md" _hover={{ textDecoration: 'underline' }} cursor="pointer">
            {title}
          </Heading>
          <Text color="blackAlpha.500">{createdAt}</Text>
          <Text dangerouslySetInnerHTML={{ __html: content }} />
        </Stack>
        <Image width="100px" alt="thumbnail" src="https://source.unsplash.com/100x100" />
      </Stack>
    </Link>
  );
};

export default InfoItem;
