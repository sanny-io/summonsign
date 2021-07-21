import '../index.css'
import '../firebase'
import Head from 'next/head'
import { AppProps } from 'next/app'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Summon Sign</title>
        <meta name="description" content="Be summoned to another world." />
        <meta name="theme-color" content="#FFFFFF" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}