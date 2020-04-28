import React from 'react'
import 'antd/dist/antd.css'

function MyApp({ Component, pageProps }) {
  React.useEffect(() => {}, [])

  return <Component {...pageProps} />
}

export default MyApp
