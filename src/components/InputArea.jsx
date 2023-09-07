// Input Area: Multiline text input area for composing chat messages.

import { useState, useId } from 'react'

import Button from './Button'

import '../styles/input-area.scss'

export default function InputArea({ callback }) {
  const [message, setMessage] = useState('')

  const inputId = useId()

  function submitHander(event) {
    event.preventDefault()
    callback(message)
  }

  return (
    <form className='input-area' onSubmit={submitHander}>
      <label className='input-area-label' htmlFor={inputId}>
        Enter Message:
      </label>
      <textarea
        className='input-area-field'
        id={inputId}
        autoFocus={true}
        autoComplete='off'
        value={message}
        onChange={event => {
          setMessage(event.target.value)
        }}
      />
      <Button variant='primary' children='Send' />
    </form>
  )
}
