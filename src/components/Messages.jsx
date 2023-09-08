// Messages: Displays all chat messages for a given server channel.

import axios from 'axios'
import { useEffect, useState } from 'react'

import '../styles/messages.scss'

export default function Messages({ messages, setMessages }) {
  const [messageDivs, setMessageDivs] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)
  const [selectedServer, setSelectedServer] = useState(1)
  let ids = 0

  // use hard-code server id 1, because we haven't implemented "servers" yet
  // **should only run once, because we only want to pull from server one time every time the page loads
  useEffect(() => {
    axios
      .get(
        `/api/messages/${selectedServer}` /*TODO: change this state variable when user selects new server*/,
      )
      .then(({ data }) => {
        let tmp = [] // --> use this because messageDivs will NOT actually change until end of useEffect
        let tmpMessages = []
        data.forEach((e) => {
          ids++
          let message = {
            username: e.user.username,
            message: e.message,
          }
          tmpMessages = [...tmpMessages, message]
          tmp = [...tmp, createMessageDiv(message, ids)]
        })
        setMessageDivs(tmp)
        setMessages(tmpMessages)
      })
  }, [])

  // every time someone sends a message, our "messages" state variable should change, and this useEffect should run again.
  useEffect(() => {
    let tmpMessageDivs = []
    messages.forEach((e) => {
      ids++
      tmpMessageDivs.push(createMessageDiv(e, ids))
    })

    setMessageDivs([tmpMessageDivs])
  }, [messages])

  // given an object formatted like this: {username, message} spit out a "message div" that we can display
  function createMessageDiv(e, id) {
    return (
      <article key={id} className="messages-chat">
        <picture className="messages-pfp">
          <img
            src={`https://placehold.co/128?text=${e.username[0]}`}
            alt="Mary Grapevine"
          />
        </picture>
        <div className="messages-content">
          <h4 className="messages-username">{e.username}</h4>
          <span className="messages-text">{e.message}</span>
        </div>
      </article>
    )
  }

  return <div className="messages">{messageDivs}</div>
}
