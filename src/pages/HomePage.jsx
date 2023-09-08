// Home Page: Page for displaying and creating new server messages.

import { useState, useEffect } from 'react'
import axios from 'axios'
import InputArea from '../components/InputArea'
import Messages from '../components/Messages'
import LoginModal from '../components/LoginModal'
import CreateServerModal from '../components/CreateServerModal'
import ServerList from '../components/ServerList'

import '../styles/home-page.scss'

export default function HomePage({ messages }) {
  const [username, setUsername] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [showServerModal, setShowServerModal] = useState(false)
  const [serverList, setServerList] = useState([])
  const [currentServer, setCurrentServer] = useState({})

  console.log('curre', currentServer)


  useEffect(() => {
    axios.get('/api/username').then(({ data }) => {
      if (data.Success) {
        setUsername(data.Success)
        getAllServers()
      } else if (data.Error) {
        // Alert user there was an error
        setShowModal(true)
        console.log(data.Error)
      }
    })
    console.log('new log')
  }, [showModal])

  async function getAllServers() {
    await axios.get('/api/server/getall')
      .then((res) => {
        setServerList(res.data.Success)
        if(res.data.Success[0]){
          setCurrentServer(res.data.Success[0])
        }
      })
  }


  async function handleSubmit(message) {
    const { data } = await axios.put('/api/message', {
      server: currentServer.name,
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
      <button
        onClick={() => {
          setShowServerModal(true)
        }}
      >
        Create Server
      </button>
      <CreateServerModal
        showServerModal={showServerModal}
        setShowServerModal={setShowServerModal}
      />
      <ServerList serverList={serverList} setCurrentServer={setCurrentServer}/>
      <Messages messages={messages} server={currentServer}/>
      <InputArea
        callback={message => {
          handleSubmit(message)
        }}
      />
    </main>
  )
}
