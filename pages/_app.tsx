import { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { ChakraProvider } from '@chakra-ui/react';
import { Layout } from '@/components/layout';
import Head from 'next/head';
import { NotificationsProvider } from 'contexts/notifications';

function EmissionsCalculator({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore: Issue with latest version of Next.js. See https://github.com/vercel/next.js/issues/40372 */}
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <NotificationsProvider>
            <Layout>
              <Head>
                <meta
                  name='viewport'
                  content='minimum-scale=1, initial-scale=1, width=device-width'
                />
              </Head>
              <Component {...pageProps} />
            </Layout>
          </NotificationsProvider>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default EmissionsCalculator;
