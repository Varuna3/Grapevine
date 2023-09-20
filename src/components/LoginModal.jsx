import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

import Modal from './Modal'
import TextField from './TextField'
import Button from './Button'
import Grid from './Grid'

import '../styles/login-modal.scss'
import { ToastContainer, toast } from 'react-toastify'

const LoginModal = ({
    showModal,
    setShowModal,
    setUsername,
    username,
    showRegisterModal,
    setShowRegisterModal,
}) => {
    const [password, setPassword] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        axios.post('/api/login', { username, password }).then((res) => {
            if (res.data.Success === true) {
                setShowModal(false)
                setPassword('')
            } else {
                toast.error('Authentication failed.')
            }
        })
    }

    function register() {
        setShowRegisterModal(true)
    }

    return (
        <div className="login-modal">
            <Modal
                open={showModal}
                setOpen={setShowModal}
                title="Welcome to Grapevine!"
            >
                {showModal && (
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
                <form onSubmit={submitHandler} className="login-modal-form">
                    <Grid>
                        <div>
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
                        </div>
                        <Grid align="end">
                            <Button variant="success">Login</Button>
                            <Button
                                type="button"
                                variant="info"
                                action={register}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Modal>
        </div>
    )
}

export default LoginModal
