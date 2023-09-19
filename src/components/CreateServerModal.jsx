import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import '../styles/create-server-modal.scss'
import TextField from './TextField'
import Button from './Button'

const CreateServerModal = ({ showServerModal, setShowServerModal }) => {
    const [name, setServerName] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [isPrivate, setIsPrivate] = useState(false)
    const [serverImage, setServerImage] = useState()

    const modalRef = useRef()

    useEffect(() => {
        if (!modalRef.current) return

        if (showServerModal) {
            modalRef.current.showModal()
        } else {
            modalRef.current.close()
        }
    }, [showServerModal])

    const submitHandler = async (e) => {
        e.preventDefault()

        await axios
            .put('/api/server', { name, imageURL, isPrivate, serverImage } , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
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
        <dialog ref={modalRef} className='create-server-modal'>
            <div className="create-server-modal-wrapper">
                <form onSubmit={submitHandler}>
                <h2 className="create-server-modal-heading">
                        Create A Server!
                    </h2>
                    <fieldset className="create-server-modal-fields">
                        <TextField 
                            type="text"
                            label="Server Name:"
                            value={name}
                            callback={setServerName}
                            required={true}
                        />
                        <TextField
                            label="Is the server private?:" 
                            type="checkbox"
                            id="isPrivate"
                            value={isPrivate}
                            callback={setIsPrivate}
                        />
                        <TextField
                            label="Upload Image" 
                            type="file"
                            id="serverImage"
                            callback={setServerImage}
                        />
                    </fieldset>
                    <Button type="submit">Create Server</Button>
                </form>
                <Button variant="danger" action={handleCancel}>Cancel</Button>
            </div>
        </dialog>
    )
}

export default CreateServerModal
