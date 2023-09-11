import { useState, useRef, useEffect } from 'react'
import axios from 'axios'


import TextField from './TextField'
import Button from './Button'

import '../styles/register-modal.scss'

const RegisterModal = ({ showRegisterModal, setShowRegisterModal, setUsername, username }) => {
    const [password, setPassword] = useState('')
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

        axios.put('/api/account/', { username, password }).then((res) => {
            if (res.data.Success === true) {
                setShowModal(false)
            } else {
                //toast.error('Authentication failed.')
            }
        })
    }


    return (
        <dialog ref={modalRef} className="register-modal">
            <div className="register-modal-wrapper">
                <form onSubmit={submitHandler} className="register-modal-form">
                    <h2 className="register-modal-heading">
                        Register for Grapevine!
                    </h2>
                    <fieldset className="register-modal-fields">
                        <TextField
                            type="text"
                            label="Enter Username:"
                            placeholder=""
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
                    <Button variant="success">Register</Button>
                </form>
            </div>
        </dialog>
    )

    
}

export default RegisterModal