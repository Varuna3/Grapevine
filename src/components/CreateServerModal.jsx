import { useState, useRef, useEffect } from "react";
import axios from "axios";


const CreateServerModal = ({ showServerModal, setShowServerModal }) => {
    const [name, setServerName] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [isPrivate, setIsPrivate] = useState()

    const modalRef = useRef();

    useEffect(() => {
        if (!modalRef.current) return;
     
        if (showServerModal) {
          modalRef.current.showModal();
        } else {
          modalRef.current.close();
        }
      }, [showServerModal]);

    const submitHandler = e => {
        e.preventDefault()

        axios.put('/api/server', {name, imageURL, isPrivate})
        .then(res => {
            if(res.data.Success){
                setServerName('')
                setImageURL('')
                setIsPrivate(false)
                setShowServerModal(false)
            } else {
                console.log(res.data.Error)
            }
        })
    }

    const handleCancel = () => {
        modalRef.current.close()
        setShowServerModal(false)

    }
 
  return (
    <dialog ref={modalRef}>
        <form onSubmit={submitHandler}>
                <label htmlFor="name">Server Name:</label>
                    <input 
                        onChange={e => setServerName(e.target.value)} 
                        type="text" 
                        id="name" 
                        name="name"
                        value={name}
                    />
                <label htmlFor="imageURL">Image URL:</label>
                    <input
                        onChange={e => setImageURL(e.target.value)}  
                        type="text" 
                        id="imageURL" 
                        name="imageURL"
                        value={imageURL}
                    />
                    <label htmlFor="isPrivate">Is the server private?:</label>
                    <input
                        onChange={e => setIsPrivate(!isPrivate)}  
                        type="checkbox" 
                        id="isPrivate" 
                        name="isPrivate"
                        value={isPrivate}
                    />
                <button type="submit">Create Server</button>
            </form>
            <button onClick={handleCancel}>Cancel</button>
    </dialog>
  );
};

export default CreateServerModal;