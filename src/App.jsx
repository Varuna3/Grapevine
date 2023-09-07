// App: Component containing the entire application.

import { useEffect, useState } from 'react'
import axios from 'axios'

import Home from './Mock_Homepage/Home'

export default function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.connect()
    socket.on('new message', data => handleNewMessage(data))
    return () => socket.disconnect()
  }, [messages])

  function handleNewMessage(data) {
    setMessages([
      ...messages,
      { username: data.username, message: data.message },
    ])
  }

  return (
    <>
      <Home messages={messages} />
    </>
  )
}
