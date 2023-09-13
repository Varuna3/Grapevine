// App: Component containing the entire application.

import { useEffect, useState } from 'react'

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
        return () => socket.disconnect()
    }, [messages])

    function handleNewMessage(data) {
        setMessages([
            ...messages,
            { username: data.username, message: data.message, userImage: data.userImage },
        ])
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
