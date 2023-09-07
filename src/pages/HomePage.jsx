// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'
import axios from 'axios'

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

    // remove this before merging / committing IF we have front-end login handler
    axios.post('/api/login', { username: 'Varuna', password: 'asdf' })
  }, [])

  async function handleSubmit(message) {
    const { data } = await axios.put('/api/message', {
      server: 'test1',
      message,
    })
    if (data.Success) {
      socket.emit('client message', { username, message })
    } else {
      socket.emit('client message', {
        username,
        message: "I think I want a pet unicorn. I'll name him Terry.",
      })
    }
  }

  return (
    <main className='home-page'>
      <Messages messages={messages} />
      <InputArea
        callback={message => {
          handleSubmit(message)
        }}
      />
    </main>
  )
}
