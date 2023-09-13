// Messages: Displays all chat messages for a given server channel.

import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

import '../styles/messages.scss'

// Container displays messages for a given server
export default function Messages({
    messages,
    setMessages,
    server,
    showSettings,
    setShowSettings,
}) {
    //state array for all current "message" elements (user image, username, message)
    const [messageDivs, setMessageDivs] = useState([])

    // create increment variable for "key" for message elements
    let ids = 0

    // reference
    const ref = useRef(null)

    // every time the selected server changes, fetch list of messages for the selected server
    useEffect(() => {
        // if the current user is in ANY servers
        if (server.id) {
            // fetch messages for currently selected server
            axios.get(`/api/messages/${server.id}`).then(({ data }) => {
                // use tmp and tmpMessages because messageDivs will NOT actually change until end of useEffect
                let tmp = [] // --> message div array
                let tmpMessages = [] // --> message array
                // add each message to the message div array and the messages array
                data.forEach((e) => {
                    ids++
                    // format messages properly
                    let message = {
                        username: e.user.username,
                        message: e.message,
                        imageURL: e.user.imageURL
                    }
                    // add message 'e' to messages array
                    tmpMessages = [...tmpMessages, message]
                    // use createMessageDiv() function to add a message element to the message div array
                    tmp = [...tmp, createMessageDiv(message, ids)]
                })
                // update both state arrays accordingly
                setMessageDivs(tmp)
                setMessages(tmpMessages)
            })
        }
    }, [server]) // --> update on change of selected server

    // every time we receive new messages and "messages" state updates, add it to the state array of message divs
    useEffect(() => {
        let tmpMessageDivs = [] // --> use this so we can .push()
        messages.forEach((e) => {
            ids++
            tmpMessageDivs.push(createMessageDiv(e, ids))
        })
        // set state message div array accordingly
        setMessageDivs([tmpMessageDivs])
    }, [messages])

    // every time the state array for message elements changes, scroll the 'messages' container
    useEffect(() => {
        ref.current.scrollTo(0, ref.current.scrollHeight)
    }, [messageDivs])

    // given an object formatted like this: {username, message} spit out a "message div" that we can display
    function createMessageDiv(e, id) {
        return (
            <article key={id} className="messages-chat">
                <picture className="messages-pfp">
                    <img
                        src={e.imageURL} // --> use first char of username to get image
                        alt={e.username}
                    />
                </picture>
                <div className="messages-content">
                    <h4 className="messages-username">{e.username}</h4>
                    {/*--> object.username */}
                    <span
                        className="messages-text"
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(marked.parse(e.message)),
                        }}
                    />
                    {/*--> object.message */}
                </div>
            </article>
        )
    }

    // return a "messages" container holding out "messageDivs" state array filled with message elements
    return (
        <>
            <h1>{server.name}</h1>
            <div
                ref={ref}
                className="messages"
                style={
                    showSettings
                        ? { width: 'calc(100vw - 340px' }
                        : { width: '100vw' }
                }
            >
                {messageDivs}
            </div>
        </>
    )
}
