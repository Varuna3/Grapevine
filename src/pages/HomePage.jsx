// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'
import axios from 'axios'
import InputArea from '../components/InputArea'
import Messages from '../components/Messages'
import LoginModal from '../components/LoginModal'

import '../styles/home-page.scss'

export default function HomePage({ messages }) {
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    axios.get('/api/username').then(({ data }) => {
      if (data.Success) {
        setUsername(data.Success)
      } else if (data.Error) {
        // Alert user there was an error
        setShowModal(true)
        console.log(data.Error)
      }
    })
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
      <LoginModal
        showModal={showModal}
        setShowModal={setShowModal}
        setUsername={setUsername}
        username={username}
      />
      <Messages messages={messages} />
      <InputArea
        callback={message => {
          handleSubmit(message)
        }}
      />
    </main>
  )
}
