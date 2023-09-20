import axios from 'axios'
import Button from './Button'

export default function Logout({
    setShowModal,
    setMessages,
    setCurrentServer,
    setServerList,
}) {
    return (
        <Button
            variant="danger"
            action={async () => {
                await axios.post('/api/logout')
                setShowModal(true)
                setMessages([])
                setCurrentServer({})
                setServerList([])
            }}
        >
            Logout
        </Button>
    )
}
