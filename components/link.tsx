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

export const DrawerLink = ({ children, href, ...props }: LinkProps & { children: ReactNode }) => {
  return (
    <NextLink href={href ?? '#'} passHref>
      <ChakraLink {...props} display="block" py={2} px={4} _hover={{ bg: 'primary.100' }}>
        {children}
      </ChakraLink>
    </NextLink>
  );
};

export default Link;
