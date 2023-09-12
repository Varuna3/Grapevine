// Input Area: Multiline text input area for composing chat messages.

import { useState, useId, useRef } from 'react'

import Button from './Button'

import '../styles/input-area.scss'

export default function InputArea({ callback }) {
    const [message, setMessage] = useState('')

    const inputId = useId()
    let ref = useRef()

    function submitHandler(event) {
        event.preventDefault()
        callback(message)
    }

    function onEnterPress(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault()
            ref.requestSubmit()
        }
    }

    return (
        <form
            ref={(el) => (ref = el)}
            className="input-area"
            onSubmit={submitHandler}
        >
            <label className="input-area-label" htmlFor={inputId}>
                Enter Message:
            </label>
            <textarea
                className="input-area-field"
                id={inputId}
                autoFocus={true}
                autoComplete="off"
                value={message}
                onChange={(event) => {
                    setMessage(event.target.value)
                }}
                onKeyDown={onEnterPress}
            />
            <Button variant="primary" children="Send" />
        </form>
    )
}
