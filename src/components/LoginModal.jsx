import { useState, useRef, useEffect } from 'react'
import axios from 'axios'

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

  const submitHandler = e => {
    e.preventDefault()

    axios.post('/api/login', { username, password }).then(res => {
      console.log('response', res.data)
      if (res.data.Success === true) {
        setShowModal(false)
      } else {
        console.log('Error in submithandler')
      }
    })
  }

  return (
    <dialog ref={modalRef}>
      <form onSubmit={submitHandler}>
        <label htmlFor='username'>Username:</label>
        <input
          onChange={e => setUsername(e.target.value)}
          type='text'
          id='username'
          name='username'
          value={username}
        />
        <label htmlFor='password'>Password:</label>
        <input
          onChange={e => setPassword(e.target.value)}
          type='password'
          id='password'
          name='password'
          value={password}
        />
        <button type='submit'>Login</button>
      </form>
    </dialog>
  )
}

export default LoginModal
