// App: Component containing the entire application.

import { useEffect, useState } from 'react'
import Home from './Mock_Homepage/Home'

export default function App() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket.connect()
    socket.on('new message', data => handleNewMessage(data))
    return () => socket.disconnect()
  }, [messages])

  function handleNewMessage(data) {
    setMessages([...messages, data])
  }

  return (
    <>
      <Home messages={messages} />
    </>
  )
}
