import React, { useEffect } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider as CustomThemeProvider } from '../contexts/ThemeContext';
import { LanguageProvider } from '../contexts/LanguageContext'; 
import { NotificationProvider } from '../contexts/NotificationContext';
import { Provider } from 'react-redux';
import { store } from '../store';
import Head from 'next/head';
import Router from 'next/router';
import '../styles/globals.css';
import { appWithTranslation } from 'next-i18next';
import '../i18n/i18n-client';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import chakraTheme from '../themes/chakraTheme';

Router.events.on('routeChangeStart', () => {
  console.log('Route change starting');
});
Router.events.on('routeChangeComplete', () => {
  console.log('Route change complete');
});
Router.events.on('routeChangeError', () => {
  console.log('Route change error');
});

function DivoApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page);
  
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>      <Provider store={store}>
        <SessionProvider session={session}>
          <ChakraProvider theme={chakraTheme} resetCSS={false}>
            <ColorModeScript initialColorMode={chakraTheme.config.initialColorMode} />
            <CustomThemeProvider>
              <LanguageProvider>
                <NotificationProvider>
                  {getLayout(<Component {...pageProps} />)}
                </NotificationProvider>
              </LanguageProvider>
            </CustomThemeProvider>
          </ChakraProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(DivoApp);
