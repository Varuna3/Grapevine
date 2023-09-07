// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'

import InputArea from '../components/InputArea'
import Messages from '../components/Messages'

import '../styles/home-page.scss'

export default function HomePage({ messages }) {
  const [username, setUsername] = useState('')

  useEffect(() => {
    // *********** USE THIS LINE AFTER WE HAVE LOGIN PAGE ******************
    // *  axios.get('/api/username').then(({ data }) => setUsername(data)) *
    // *********************************************************************

    setUsername('Varuna')
  }, [])

  return (
    <main className='home-page'>
      <Messages messages={messages} />
      <InputArea
        callback={message => {
          socket.emit('client message', { username, message })
        }}
      />
    </main>
  )
}
