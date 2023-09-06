import SendButton from './SendButton'
import { useState } from 'react'

const InputBox = () => {
  const [message, setMessage] = useState('')

  return (
    <div style={{ display: 'flex', gap: 20 }}>
      <form>
        <label htmlFor='input'>Enter a message:</label>
        <input
          type='text'
          id='input'
          autoComplete='off'
          value={message}
          onChange={e => setMessage(e.target.value)}
        />
        <SendButton message={message} />
      </form>
    </div>
  )
}

export default InputBox
