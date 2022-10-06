import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { makeServer } from '../services/mirage'

import { QueryClient, QueryClientProvider } from 'react-query'

import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient'

if(process.env.NODE_ENV == 'development'){
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools/>
      </QueryClientProvider>
  )
}

export default MyApp
