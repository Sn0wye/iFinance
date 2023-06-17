// src/pages/_app.tsx
import { KBarProvider } from 'kbar';
import type { AppType } from 'next/app';
import { ClerkProvider } from '@clerk/nextjs';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { CommandPalette } from '../components/CommandPalette';
import { useActions } from '../hooks/useActions';
import { GlobalStyle } from '../styles/global';
import '../styles/globals.css';
import { defaultTheme } from '../styles/themes/default';
import { api } from '~/utils/api';

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

export default api.withTRPC(MyApp);
