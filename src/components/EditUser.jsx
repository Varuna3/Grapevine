import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

import TextField from './TextField'
import Button from './Button'

const EditUser = ({
    username, 
    imageURL, 
    email, 
    setUsername, 
    setProfileImage, 
    setProfileEmail,
    setIsEditing  }) => {

    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios
            .put('/api/update', { username, imageURL, email, password } , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                  }
            })
            .then((res) => {
                if (res.data.Success) {
                    console.log('res.data.Success', res.data.Success)
                    setProfileImage(res.data.Success.imageURL)
                    setUsername(res.data.Success.username)
                    setIsEditing(false)
                } else {
                    toast.error(res.data.Error)
                }
            })
    }

    function cancelEdit(){
        setIsEditing(false)
    }

    return (
        <>
        <TextField
            type="file"
            label="Upload Image:"
            callback={setProfileImage}
        />
        <TextField
            type="text"
            label="Username:"
            placeholder=""
            value={username}
            callback={setUsername}
        />
        <TextField
            type="password"
            label="Password:"
            placeholder=""
            value={password}
            callback={setPassword}
        />
        <TextField
            type="text"
            label="Email:"
            placeholder=""
            value={email}
            callback={setProfileEmail}
        />
        <Button variant="danger" action={cancelEdit}>Cancel</Button>
        <Button variant="primary" type="submit" action={handleSubmit}>Save</Button>
        </>
    )
}

export default EditUser;