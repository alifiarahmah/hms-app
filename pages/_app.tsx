import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { AppProps } from 'next/app';
import { theme } from 'theme';
import 'public/globals.css';
import 'public/calendar.css';
import 'public/react-calendar.css';

import '@fontsource/harmattan/400.css';
import '@fontsource/harmattan/700.css';
import '@fontsource/livvic/400.css';
import '@fontsource/livvic/700.css';
import SessionGuard from 'components/provider/sessionGuard';

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps<any>) {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <SessionGuard>
          <Component {...pageProps} />
        </SessionGuard>
      </ChakraProvider>
    </SessionProvider>
  );
}
