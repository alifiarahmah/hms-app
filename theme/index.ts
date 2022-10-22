import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#f2e1cd',
      300: '#96b29e',
      500: '#4f7565',
      700: '#175442',
    },
    secondary: {
      100: '#dca548',
      300: '#974b29',
    },
    black: {
      100: '#c3c4b1',
      300: '#505451',
      500: '#1f1b1f',
    },
    pink: {
      100: '#f9c3b2',
      300: '#b85a6f',
    },
  },
  fonts: {
    heading: 'Gurindam, sans-serif',
    body: 'Livvic, sans-serif',
  },
  styles: {
    global: {
      body: {
        fontweight: '400',
        fontSize: '1.25rem',
        color: 'primary.500',
        bg: 'primary.100',
        bgRepeat: 'repeat',
        bgSize: 'cover',
      },
      h1: {},
      h2: {},
      h3: {},
    },
  },
  components: {
    Container: {
      baseStyle: {
        maxWidth: 'auto',
      },
    },
    Link: {
      baseStyle: {
        _hover: {
          textDecoration: 'none',
        },
      },
    },
    Input: {
      defaultProps: {
        variant: 'filled',
      },
    },
  },
});
