import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import TextField from './TextField'
import Button from './Button'

import '../styles/login-modal.scss'
import { ToastContainer, toast } from 'react-toastify'

const LoginModal = ({ showModal, setShowModal, setUsername, username }) => {
    const [password, setPassword] = useState('')

    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return
        if (showModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showModal])

    const submitHandler = (e) => {
        e.preventDefault()

        axios.post('/api/login', { username, password }).then((res) => {
            if (res.data.Success === true) {
                setShowModal(false)
            } else {
                toast.error('Authentication failed.')
            }
        })
    }

    return (
        <dialog ref={modalRef} className="login-modal">
            {showModal ? (
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

            <div className="login-modal-wrapper">
                <form onSubmit={submitHandler} className="login-modal-form">
                    <h2 className="login-modal-heading">
                        Welcome to Grapevine!
                    </h2>
                    <fieldset className="login-modal-fields">
                        <TextField
                            type="text"
                            label="Enter Username:"
                            placeholder="Lord of Grapes"
                            value={username}
                            callback={setUsername}
                            required={true}
                        />
                        <TextField
                            type="password"
                            label="Enter Password:"
                            value={password}
                            callback={setPassword}
                            required={true}
                        />
                    </fieldset>
                    <Button variant="success">Login</Button>
                </form>
            </div>
        </dialog>
    )
}

export default LoginModal
