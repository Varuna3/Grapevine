import { useState } from 'react'
import DOMPurify from 'dompurify'
import { marked } from 'marked'

import Button from './Button'

export default function MessageDiv({ e, messageId, serverId }) {
    const [showDelete, setShowDelete] = useState(false)
    const [deleted, setDeleted] = useState(false)

    return (
        <article
            className="messages-chat"
            onMouseEnter={() => {
                setShowDelete(true)
            }}
            onMouseLeave={() => {
                setShowDelete(false)
            }}
        >
            <div className="messages-profile">
                <img
                    src={e.userImage} // --> use first char of username to get image
                    alt={e.username}
                    className="messages-pfp"
                />
                <h4 className="messages-username">{e.username}</h4>
            </div>
            <div className="messages-content">
                {/*--> object.username */}
                <span
                    className="messages-text"
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(marked.parse(e.message)),
                    }}
                />
                {/*--> object.message */}
            </div>
            {!deleted ? (
                <div
                    className="messages-delete-button"
                    style={showDelete ? {} : { display: 'none' }}
                >
                    <Button
                        action={() => {
                            setDeleted(true)
                            socket.emit('delete message', {
                                message: e.message,
                                username: e.username,
                                serverId,
                                key: messageId,
                            })
                        }}
                    >
                        delete
                    </Button>
                </div>
            ) : (
                <></>
            )}
        </article>
    )
}
