import { useState } from 'react';
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';

function EmissionsCalculator({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {/* @ts-ignore: Issue with latest version of Next.js. See https://github.com/vercel/next.js/issues/40372 */}
      <Hydrate state={pageProps.dehydratedState}>
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  );
}

export default EmissionsCalculator
