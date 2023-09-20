import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

import TextField from './TextField'
import Button from './Button'
import Modal from './Modal'

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

    const submitHandler = (e) => {
        e.preventDefault()

        axios
            .put(
                '/api/account/',
                { username, password, email, imageURL },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
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
        <Modal
            open={showRegisterModal}
            setOpen={setShowRegisterModal}
            title="Register for Grapevine!"
        >
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
            <div className="register-modal">
                <form onSubmit={submitHandler} className="register-modal-form">
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
        </Modal>
    )
}

export default RegisterModal
