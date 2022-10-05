import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#f2e1cd',
      300: '#96b29e',
      500: '#4f7565',
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
    heading: 'Gurindam, Livvic, sans-serif',
    body: '"Oceanside Typewriter", Harmattan, sans-serif',
  },
  styles: {
    global: {
      body: {
        fontSize: '1.25rem',
        color: 'black.500',
        bg: 'primary.100',
        bgImage: 'url("/VSTOCKS/PATTERN/PATTERN5_edited.png")',
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
  },
});
