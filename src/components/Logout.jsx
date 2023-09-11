import axios from 'axios'

export default function Logout({ setShowModal, setMessages }) {
    return (
        <button
            onClick={async () => {
                await axios.post('/api/logout')
                setShowModal(true)
                setMessages([])
            }}
        >
            Logout
        </button>
    )
}
