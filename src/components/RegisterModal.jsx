import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import TextField from './TextField'
import Button from './Button'

import '../styles/register-modal.scss'

const RegisterModal = ({
    showRegisterModal,
    setShowRegisterModal,
    setUsername,
    username,
}) => {
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [imageURL, setImageURL] = useState()
    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return
        if (showRegisterModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showRegisterModal])

    const submitHandler = (e) => {
        e.preventDefault()

        axios
            .put('/api/account/', { username, password, email, imageURL },{
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            .then((res) => {
                if (res.data.Success) {
                    toast.success('Registration Success!')
                    setPassword('')
                    setEmail('')
                    setShowRegisterModal(false)
                } else {
                    toast.error('Registration failed.')
                }
            })
    }

    return (
        <dialog ref={modalRef} className="register-modal">
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
            <div className="register-modal-wrapper">
                <form onSubmit={submitHandler} className="register-modal-form">
                    <h2 className="register-modal-heading">
                        Register for Grapevine!
                    </h2>
                    <fieldset className="register-modal-fields">
                        <TextField
                            type="text"
                            label="Enter Username:"
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
                        <TextField
                            type="email"
                            label="Enter Email:"
                            value={email}
                            callback={setEmail}
                            required={true}
                        />
                        <TextField
                            type="file"
                            label="Upload Image:"
                            callback={setImageURL}
                            required={true}
                        />
                    </fieldset>
                    <Button variant="success">Register</Button>
                </form>
            </div>
        </dialog>
    )
}

export default RegisterModal
