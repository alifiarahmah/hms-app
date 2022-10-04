import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { theme } from 'theme';
import 'public/globals.css';
import 'public/calendar.css';

import '@fontsource/harmattan/400.css';
import '@fontsource/harmattan/700.css';
import '@fontsource/livvic/400.css';
import '@fontsource/livvic/700.css';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}
