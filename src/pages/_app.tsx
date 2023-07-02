// import { KBarProvider } from 'kbar';
import type { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';

// import { CommandPalette } from '../components/CommandPalette';
// import { useActions } from '../hooks/useActions';
import '../styles/globals.css';
import { api } from '~/utils/api';
import { cn } from '~/utils/cn';
import { Roboto, Overpass } from 'next/font/google';

export const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
  display: 'swap'
});

export const overpass = Overpass({
  subsets: ['latin'],
  variable: '--font-overpass'
});

const MyApp: AppType = ({ Component, ...pageProps }) => {
  // const actions = useActions();

  return (
    <>
      <Head>
        <title>iFinance</title>
        <link rel='shortcut icon' href='/favicon.png' type='image/png' />
      </Head>

      <ClerkProvider {...pageProps}>
        {/* <KBarProvider actions={actions}> */}
        {/* <CommandPalette /> */}
        <main
          className={cn(
            'font-roboto min-h-screen bg-zinc-900 text-zinc-100',
            roboto.variable,
            overpass.variable
          )}
        >
          <Component {...pageProps} />
        </main>
        {/* </KBarProvider> */}
      </ClerkProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
