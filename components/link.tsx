import { Link as ChakraLink } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

const Link = ({ children, href }: { children: ReactNode; href?: string }) => {
  return (
    <NextLink href={href ?? "#"} passHref>
      <ChakraLink>{children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
