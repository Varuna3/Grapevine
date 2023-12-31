import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import '../styles/create-server-modal.scss'
import TextField from './TextField'
import Button from './Button'
import Modal from './Modal'

const CreateServerModal = ({ showServerModal, setShowServerModal }) => {
    const [name, setServerName] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [serverImage, setServerImage] = useState()

    const modalRef = useRef()

    const submitHandler = async (e) => {
        e.preventDefault()

        await axios
            .put(
                '/api/server',
                { name, imageURL, isPrivate, serverImage },
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
            .then((res) => {
                if (res.data.Success) {
                    // setServerName('')
                    setImageURL('')
                    setIsPrivate(false)
                    setShowServerModal(false)
                } else {
                    console.log(res.data.Error)
                }
            })
        await axios
            .post('/api/server/addUser', { serverName: name, isAdmin: true })
            .then(({ data }) => {
                if (data.Success) {
                    setServerName('')
                } else {
                    console.log(data.Error)
                }
            })
    }

    const handleCancel = () => {
        modalRef.current.close()
        setShowServerModal(false)
    }

    return (
        <Modal
            open={showServerModal}
            setOpen={setShowServerModal}
            title="Create Le Server"
        >
            <form onSubmit={submitHandler} className="create-server-modal">
                <fieldset>
                    <TextField
                        type="text"
                        label="Server Name:"
                        value={name}
                        callback={setServerName}
                        required={true}
                    />
                    <TextField
                        label="Upload Image"
                        type="file"
                        id="serverImage"
                        callback={setServerImage}
                    />
                    <TextField
                        label="Is the server private?:"
                        type="checkbox"
                        id="isPrivate"
                        value={isPrivate}
                        callback={setIsPrivate}
                    />
                </fieldset>
                <Button variant="success" type="submit">
                    Create Server
                </Button>
            </form>
        </Modal>
    )
}

export default CreateServerModal
