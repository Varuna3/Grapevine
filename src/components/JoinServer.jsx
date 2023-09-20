import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import TextField from './TextField'
import Button from './Button'
import '../styles/join-server.scss'
import Modal from './Modal'

export default function JoinServer({
    showJoinServerModal,
    setShowJoinServerModal,
}) {
    const [input, setInput] = useState('')

    return (
        <Modal
            open={showJoinServerModal}
            setOpen={setShowJoinServerModal}
            title="Join Server"
        >
            {showJoinServerModal && (
                <ToastContainer
                    position="top-center"
                    autoClose={2500}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable
                    pauseOnHover={false}
                    theme="dark"
                />
            )}
            <form
                className="join-server"
                onSubmit={async (e) => {
                    e.preventDefault()
                    const { data } = await axios.post('/api/server/join', {
                        inviteString: input,
                    })
                    if (data.Success) {
                        toast.success(data.Success)
                    } else {
                        toast.error(data.Error)
                    }
                }}
            >
                <TextField
                    id="input"
                    type="text"
                    label="Enter Invite Code:"
                    placeholder="h41rygr4pe"
                    value={input}
                    callback={setInput}
                />
                <Button variant="success" type="submit">
                    Join Server
                </Button>
            </form>
        </Modal>
    )
}
