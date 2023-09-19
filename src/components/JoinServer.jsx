import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import TextField from './TextField'
import Button from './Button'
import '../styles/join-server.scss'

export default function JoinServer({
    showJoinServerModal,
    setShowJoinServerModal,
}) {
    const [input, setInput] = useState('')

    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return

        if (showJoinServerModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    })

    return (
        <dialog ref={modalRef} className="join-server">
            {showJoinServerModal ? (
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
            ) : (
                <></>
            )}
            <div className="join-server-wrapper">
                <form
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
                    <h2 className="join-server-heading">
                        Invite:
                    </h2>
                    <TextField
                        id="input"
                        type="text" 
                        label=""
                        placeholder="h41rygr4pe"
                        value={input}
                        action={(e) => {
                            setInput(e.target.value)
                        }}
                    />
                    <Button>Join Server</Button>
                </form>
                <Button
                variant="danger"
                    action={() => {
                        setShowJoinServerModal(false)
                        setInput('')
                    }}
                >
                    Close
                </Button>
            </div>
        </dialog>
    )
}
