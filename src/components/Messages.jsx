// Messages: Displays all chat messages for a given server channel.

import axios from 'axios'
import { useEffect, useRef, useState } from 'react'

import '../styles/messages.scss'
import Button from './Button'
import MessageDiv from './MessageDiv'

// Container displays messages for a given server
export default function Messages({
    messages,
    setMessages,
    server,
    showSettings,
    setShowSettings,
    user,
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
                        userImage: e.user.imageURL,
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

    // given an object formatted like this: {username, message} spit out a "e div" that we can display
    function createMessageDiv(e, id) {
        // const [showDelete, setShowDelete] = useState(false)
        return (
            <MessageDiv
                e={e}
                key={id}
                messageId={id}
                serverId={server.id}
                user={user}
            />
        )
    }

    // return a "messages" container holding out "messageDivs" state array filled with message elements
    return (
        <>
            <div ref={ref} className="messages">
                {!server.name ? (
                    <div className="messages-welcome">
                        <h1>Welcome to Grapevine!</h1>
                        <strong>Select or join a server!</strong>
                    </div>
                ) : (
                    <h1 className="messages-name">{server.name}</h1>
                )}
                {messageDivs}
            </div>
        </>
    )
}
