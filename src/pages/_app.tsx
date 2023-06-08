// src/pages/_app.tsx
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { withTRPC } from '@trpc/next';
import { KBarProvider } from 'kbar';
import type { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import superjson from 'superjson';

import { CommandPalette } from '../components/CommandPalette';
import { useActions } from '../hooks/useActions';
import type { RootRouter } from '../server/routers/root';
import { GlobalStyle } from '../styles/global';
import '../styles/globals.css';
import { defaultTheme } from '../styles/themes/default';

const MyApp: AppType = ({ Component, ...pageProps }) => {
  const actions = useActions();

  return (
    <>
      <Head>
        <title>iFinance</title>
      </Head>

      <ClerkProvider {...pageProps}>
        <ThemeProvider theme={defaultTheme}>
          <KBarProvider actions={actions}>
            <GlobalStyle />
            <CommandPalette />
            <Component {...pageProps} />
          </KBarProvider>
        </ThemeProvider>
      </ClerkProvider>
    </>
  );
};

const getBaseUrl = () => {
  if (typeof window !== 'undefined') return ''; // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};

export default withTRPC<RootRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      links: [
        loggerLink({
          enabled: opts =>
            process.env.NODE_ENV === 'development' ||
            (opts.direction === 'down' && opts.result instanceof Error)
        }),
        httpBatchLink({ url })
      ],
      url,
      transformer: superjson
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },

      // To use SSR properly you need to forward the client's headers to the server
      // headers: () => {
      //   if (ctx?.req) {
      //     const headers = ctx?.req?.headers;
      //     delete headers?.connection;
      //     return {
      //       ...headers,
      //       "x-ssr": "1",
      //     };
      //   }
      //   return {};
      // }
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: false
})(MyApp);
