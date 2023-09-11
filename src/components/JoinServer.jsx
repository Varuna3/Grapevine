import axios from 'axios'
import { useState, useEffect, useRef } from 'react'
import { toast, ToastContainer } from 'react-toastify'

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
        <dialog ref={modalRef}>
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
                <h2>Invite:</h2>
                <label htmlFor="input"></label>
                <input
                    id="input"
                    type="text"
                    placeholder="h41rygr4pe"
                    autoComplete="off"
                    value={input}
                    onChange={(e) => {
                        setInput(e.target.value)
                    }}
                />
                <button>Join Server</button>
            </form>
            <button
                onClick={() => {
                    setShowJoinServerModal(false)
                }}
            >
                Close
            </button>
        </dialog>
    )
}
