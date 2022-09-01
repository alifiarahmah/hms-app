import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';
import { theme } from 'theme';

import '@fontsource/harmattan/400.css';
import '@fontsource/harmattan/700.css';
import '@fontsource/livvic/400.css';
import '@fontsource/livvic/700.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
