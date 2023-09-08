// App: Component containing the entire application.

import { useEffect, useState } from 'react'

import HomePage from './pages/HomePage'

export default function App() {
    const [messages, setMessages] = useState([])

    useEffect(() => {
        socket.connect()
        socket.on('new message', (data) => handleNewMessage(data))
        return () => socket.disconnect()
    }, [messages])

    function handleNewMessage(data) {
        setMessages([
            ...messages,
            { username: data.username, message: data.message },
        ])
    }

    return (
        <div>
            <HomePage messages={messages} setMessages={setMessages} />
        </div>
    )
}
