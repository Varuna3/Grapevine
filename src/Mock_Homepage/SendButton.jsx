import { useEffect, useState } from 'react'
import axios from 'axios'

const SendButton = ({ message }) => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    // *********** USE THIS LINE AFTER WE HAVE LOGIN PAGE ******************
    // *  axios.get('/api/username').then(({ data }) => setUsername(data)) *
    // *********************************************************************

    setUsername('Varuna')
  }, [])

  return (
    <>
      <button
        onClick={e => {
          e.preventDefault()
          socket.emit('client message', { username, message })
        }}
      >
        Send
      </button>
    </>
  )
}

export default SendButton
