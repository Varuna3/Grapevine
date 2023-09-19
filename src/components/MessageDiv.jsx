import { useState } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

import Button from './Button'
import axios from 'axios'
// import { EMOJIS } from '../assets/Emojis.json'
import { VALID_CHARS } from '../assets/ValidChars.json'

export default function MessageDiv({ e, messageId, serverId }) {
    const [showDelete, setShowDelete] = useState(false)
    const [deleted, setDeleted] = useState(false)

    // const emojis = new Set([...EMOJIS])
    const validChars = new Set([...VALID_CHARS])

    var shouldBeLarge = false

    if (e.message.length < 12 && !e.message.includes('img')) {
        const message = e.message.split('')
        for (let i = 0; i < message.length; i++) {
            if (validChars.has(message[i])) {
                shouldBeLarge = false
                break
            } else {
                shouldBeLarge = true
            }
        }
    }

    return (
        <article
            className="messages-chat"
            onPointerEnter={() => {
                setShowDelete(true)
            }}
            onPointerLeave={() => {
                setShowDelete(false)
            }}
        >
            <div className="messages-profile">
                <img
                    src={e.userImage} // --> use first char of username to get image
                    alt={e.username}
                    className="messages-pfp"
                />
                {/*--> object.username */}
                <h4 className="messages-username">{e.username}</h4>
            </div>
            <div className="messages-content">
                {/*--> object.message */}
                <span
                    className="messages-text"
                    style={
                        shouldBeLarge
                            ? { fontSize: '2.5em' }
                            : { fontSize: '1em' }
                    }
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(e.message)),
                    }}
                />
            </div>
            {!deleted ? (
                <div
                    className="messages-delete-button"
                    style={showDelete ? {} : { display: 'none' }}
                >
                    <Button
                        variant="danger"
                        action={async () => {
                            setDeleted(true)
                            await axios.delete('/api/message', {
                                data: {
                                    username: e.username,
                                    serverId,
                                    message: e.message,
                                },
                            })
                            socket.emit('delete message', {
                                message: e.message,
                                username: e.username,
                                serverId,
                                key: messageId,
                            })
                        }}
                    >
                        Delete Message
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </article>
    )
}
