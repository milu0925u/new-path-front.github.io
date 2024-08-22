import '@/styles/globals.scss'
import '@/styles/unity.scss'
import '@/styles/reset.css'
import '@/styles/loading.scss'
import '@/styles/style.css'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Loading from '@/component/loading'
export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const handleRouteChangeStart = () => setLoading(true)
    const handleRouteChangeComplete = () => setLoading(false)

    Router.events.on('routeChangeStart', handleRouteChangeStart)
    Router.events.on('routeChangeComplete', handleRouteChangeComplete)
    Router.events.on('routeChangeError', handleRouteChangeComplete)

    return () => {
      Router.events.off('routeChangeStart', handleRouteChangeStart)
      Router.events.off('routeChangeComplete', handleRouteChangeComplete)
      Router.events.off('routeChangeError', handleRouteChangeComplete)
    }
  }, [])
  return (
    <>
      <Provider store={store}>
        {loading && <Loading />}
        <Component {...pageProps} />
      </Provider>
    </>
  )
}
