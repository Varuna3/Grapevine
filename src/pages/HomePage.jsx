// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'
import axios from 'axios'
import InputArea from '../components/InputArea'
import Messages from '../components/Messages'
import LoginModal from '../components/LoginModal'
import CreateServerModal from '../components/CreateServerModal'

import '../styles/home-page.scss'

export default function HomePage({ messages }) {
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false);
  const [showServerModal, setShowServerModal] = useState(false);


  useEffect(() => {
    axios.get('/api/username')
      .then(({ data }) => {
        if(data.Success){
          setUsername(data.Success)
        } else if(data.Error) {
          // Alert user there was an error
          setShowModal(true)
          console.log(data.Error)
        }
      })
  }, [])

  return (
    <main className='home-page'>
      <button onClick={() => {setShowServerModal(true)}}>Create Server</button>
      <CreateServerModal showServerModal={showServerModal} setShowServerModal={setShowServerModal}/>
      <LoginModal showModal={showModal} setShowModal={setShowModal} />
      <Messages messages={messages} />
      <InputArea
        callback={message => {
          socket.emit('client message', { username, message })
        }}
      />
    </main>
  )
}
