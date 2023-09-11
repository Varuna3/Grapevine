import axios from 'axios'

export default function Logout({
    setShowModal,
    setMessages,
    setCurrentServer,
    setServerList,
}) {
    return (
        <button
            onClick={async () => {
                await axios.post('/api/logout')
                setShowModal(true)
                setMessages([])
                setCurrentServer({})
                setServerList([])
            }}
        >
            Logout
        </button>
    )
}
