import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr';
import { CssBaseline, ThemeProvider } from '@mui/material'; 
import { CartProvider, UiProvider,AuthProvider } from '@/context';
import { lightTheme } from '@/themes';

export default function App({ Component, pageProps }: AppProps) {
  return (

    <SWRConfig
      value={{
        fetcher:(resource, init) => fetch(resource, init).then(res => res.json()),
      }}
    >
      <AuthProvider>
        <CartProvider>
          <UiProvider>
            <ThemeProvider theme={ lightTheme }>
              <CssBaseline/>
              <Component {...pageProps} />
            </ThemeProvider>
          </UiProvider>
        </CartProvider>
      </AuthProvider>
    </SWRConfig>
  )
}
