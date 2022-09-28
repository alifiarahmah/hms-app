import { Link as ChakraLink, LinkProps } from '@chakra-ui/react';
import NextLink from 'next/link';
import { ReactNode } from 'react';

const Link = ({ children, href, ...props }: LinkProps) => {
  return (
    <NextLink href={href ?? '#'} passHref>
      <ChakraLink {...props}>{children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
