// Messages: Displays all chat messages for a given server channel.

import { useEffect, useState } from 'react'

import '../styles/messages.scss'

export default function Messages({ messages }) {
  const [messageDivs, setMessageDivs] = useState([])
  let ids = 0

  useEffect(() => {
    setMessageDivs(
      messages.map(e => {
        ids++
        return (
          <article className='messages-chat'>
            <picture className='messages-pfp'>
              <img
                src={`https://placehold.co/128?text=${e.username[0]}`}
                alt='Mary Grapevine'
              />
            </picture>
            <div className='messages-content'>
              <h4 className='messages-username'>{e.username}</h4>
              <span className='messages-text'>{e.message}</span>
            </div>
          </article>
        )
      })
    )
  }, [messages])

  return <div className='messages'>{messageDivs}</div>
}
