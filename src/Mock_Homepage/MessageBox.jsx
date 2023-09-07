import { useEffect, useState } from 'react'

const MessageBox = ({ messages }) => {
  const [messageDivs, setMessageDivs] = useState([])
  let ids = 0

  useEffect(() => {
    setMessageDivs(
      messages.map(e => {
        ids++
        return (
          <div key={ids}>
            <p>
              {e.username}: {e.message}
            </p>
          </div>
        )
      })
    )
  }, [messages])

  return (
    <>
      <div style={{ width: 400, height: 400, border: '2px solid green' }}>
        {messageDivs}
      </div>
    </>
  )
}

export default MessageBox
