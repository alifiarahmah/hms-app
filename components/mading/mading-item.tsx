import { Heading, Image, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface MadingItemProps {
  id: string;
}

const MadingItem = ({ id }: MadingItemProps) => {
  return (
    <Link href={`/mading/${id}`}>
      <Stack my={5} direction="row" alignItems="center" gap={10}>
        <Stack>
          <Heading as="h2" size="md" _hover={{ textDecoration: 'underline' }} cursor="pointer">
            Mading Headline
          </Heading>
          <Text color="blackAlpha.500">5 Days ago</Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempor tincidunt finibus.
            Cras non lectus pretium, cursus odio nec, accumsan nulla. Nam egestas vestibulum mi, vel
            consequat velit gravida nec. Nam massa augue, tempor et felis porttitor, malesuada
            fringilla augue. Curabitur nec nisi vitae nisl semper vehicula.
          </Text>
        </Stack>
        <Image width="100px" alt="thumbnail" src="https://source.unsplash.com/100x100" />
      </Stack>
    </Link>
  );
};

export default MadingItem;
