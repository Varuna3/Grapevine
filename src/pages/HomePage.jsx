// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'
import axios from 'axios'
import InputArea from '../components/InputArea'
import Messages from '../components/Messages'
import LoginModal from '../components/LoginModal'

import '../styles/home-page.scss'

export default function HomePage({ messages }) {
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false);

  console.log('username', username)

  useEffect(() => {
    axios.get('/api/username')
      .then(({ data }) => {
        if(data.Success){
          setUsername(data.Success)
        } else if(data.Error) {
          // Alert user there was an error
          console.log(data.Error)
        }
      })
  }, [])

  return (
    <main className='home-page'>
      <LoginModal showModal={showModal} setShowModal={setShowModal} setUsername={setUsername}/>
      <Messages messages={messages} />
      <InputArea
        callback={message => {
          socket.emit('client message', { username, message })
        }}
      />
    </main>
  )
}
