import { useState, useEffect } from 'react'
import { Input, Alert } from 'antd'
import axios from 'axios'

const { Search } = Input

export default () => {
  const [server, setServer] = useState('')
  const [content, setContent] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async (server) => {
      try {
        const { data } = await axios(server).catch((err) => console.log(err))
        return JSON.stringify(data, null, 4)
      } catch (error) {
        setError(`Error loading from ${server}`)
        return ''
      }
    }

    if (server.includes('localhost')) {
      setLoading(true)
      load(server)
        .then(setContent)
        .finally(() => setLoading(false))
    }
  }, [server, setLoading, setContent, setError])

  return (
    <main style={{ margin: '5rem auto', width: '600px' }}>
      <Search
        loading={loading}
        addonBefore="GET:"
        placeholder="input request url"
        onSearch={setServer}
        enterButton
      />
      {content && (
        <div style={{ margin: '2rem' }}>
          <pre
            style={{
              border: '1px dashed black',
              padding: '2rem',
              fontSize: 'small',
              height: '40rem',
              overflowY: 'scroll',
            }}
          >
            {content}
          </pre>
        </div>
      )}
      {error && (
        <Alert
          style={{ marginTop: '2rem' }}
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      )}
    </main>
  )
}
