import { useState, useRef, useEffect } from "react";
import axios from "axios";


const LoginModal = ({ showModal, setShowModal }) => {
    const [serverName, setServerName] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [isPrivate, setIsPrivate] = useState('')

    const modalRef = useRef();

    useEffect(() => {
        if (!modalRef.current) return;
     
        if (showModal) {
          modalRef.current.showModal();
        } else {
          modalRef.current.close();
        }
      }, [showModal]);

    const submitHandler = e => {
        e.preventDefault()

        axios.post('/api/server', {serverName, imageURL, isPrivate})
        .then(res => {
            console.log('response', res.data)
            if(res.data.Success === true){
                setShowModal(false)
            } else {
                console.log('Error in submithandler')
            }
        })
    }
 
  return (
    <dialog ref={modalRef}>
        <form onSubmit={submitHandler}>
                <label htmlFor="serverName">Server Name:</label>
                    <input 
                        onChange={e => setServerName(e.target.value)} 
                        type="text" 
                        id="serverName" 
                        name="serverName"
                        value={serverName}
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
                        onChange={e => setIsPrivate(e.target.value)}  
                        type="checkbox" 
                        id="isPrivate" 
                        name="isPrivate"
                        value={isPrivate}
                    />
                <button onClick={() => {modalRef.current.close()}}>Cancel</button>
                <button type="submit">Login</button>
            </form>
    </dialog>
  );
};

export default LoginModal;