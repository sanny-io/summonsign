import type { AppProps as Props } from 'next/app'

import '../index.css'
import Head from 'next/head'
import Footer from '../components/Footer'
import MainLayout from '../components/MainLayout'
import { MantineProvider } from '@mantine/core'
import { Provider } from 'react-redux'
import store from '../store'

export default function App({ Component, pageProps }: Props) {
  return (
    <Provider store={store}>
      <Head>
        <title>Summon Sign</title>
        <meta name="description" content="Be summoned to another world." />
        <meta name="theme-color" content="#000000" />
      </Head>

      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>

      <Footer />
    </Provider>
  )
}