// App: Component containing the entire application.

import { useEffect, useState } from 'react'
import lodash from 'lodash'
import { toast } from 'react-toastify'

import HomePage from './pages/HomePage'

import './styles/app.scss'

export default function App() {
    const [messages, setMessages] = useState([])
    const [currentServer, setCurrentServer] = useState({})

    useEffect(() => {
        socket.connect()
        socket.on('new message', (data) => {
            if (data.server === currentServer.id) handleNewMessage(data)
        })
        socket.on('delete message', (data) => {
            if (data.serverId === currentServer.id) handleDeleteMessage(data)
        })
        socket.on('secret', (data) => {
            toast(data.secret)
        })
        socket.on('secret error', (data) => {
            toast.error(data.error)
        })
        return () => {
            socket.off('new message')
            socket.off('delete message')
            socket.off('secret')
            socket.off('secret error')
            socket.disconnect()
        }
    }, [messages])

    function handleNewMessage(data) {
        setMessages([
            ...messages,
            {
                username: data.username,
                message: data.message,
                userImage: data.userImage,
            },
        ])
    }

    function handleDeleteMessage(data) {
        let index = 0
        const noun = lodash.sample([
            'grape',
            'pancake',
            'waffle',
            'rock',
            'human',
        ])
        messages.forEach((e, i) => {
            if (e.message === data.message) {
                index = i
            }
        })
        const dup = messages.map((e) => e)
        dup[index].message = `This message was deleted for ${noun} slander.`
        setMessages(dup)
    }

    return (
        <div>
            <HomePage
                messages={messages}
                setMessages={setMessages}
                currentServer={currentServer}
                setCurrentServer={setCurrentServer}
            />
        </div>
    )
}
