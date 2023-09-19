// Input Area: Multiline text input area for composing chat messages.

import { useState, useId, useRef } from 'react'
import lodash from 'lodash'
import axios from 'axios'
import Button from './Button'

import '../styles/input-area.scss'
import EmojiContainer from './EmojiContainer'
import GifContainer from './GifContainer'

export default function InputArea({
    callback,
    currentServer,
    username,
    profileImage,
}) {
    const [message, setMessage] = useState('')
    const [openEmojis, setOpenEmojis] = useState(false)
    const [openGifs, setOpenGifs] = useState(false)
    const [randomGifs, setRandomGifs] = useState([])

    const inputId = useId()
    let ref = useRef()

    function submitHandler(event) {
        event.preventDefault()
        callback(message)
        setMessage('')
    }

    function onEnterPress(e) {
        if (e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault()
            ref.requestSubmit()
        } else if (e.keyCode == 8) {
            setMessage(message.substring(0, 254))
        }
    }

    async function getRandomGifs() {
        const { data } = await axios.get(`/api/randomgifs`)
        setRandomGifs(data)
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
                placeholder={lodash.sample([
                    'I like rocks.',
                    'I like to watch kids tv.',
                    'Grapes are the best fruit!',
                    'The earth is flat.',
                    'Pancakes > waffles',
                    '#ihatewaffles',
                    'I drive a Ford f550.',
                ])}
                value={message}
                onChange={(event) => {
                    const str = event.target.value
                    if (message.length < 255) setMessage(str)
                    else setMessage(str.substring(0, 254) + str[255])
                }}
                onKeyDown={onEnterPress}
            />
            <div className="input-area-controls">
                <Button
                    variant="yellow"
                    type="button"
                    action={() => {
                        setOpenEmojis(!openEmojis)
                    }}
                    children="😍"
                />
                <Button
                    variant="pink"
                    type="button"
                    action={() => {
                        setOpenGifs(!openGifs)
                        getRandomGifs(randomGifs)
                    }}
                    children="GIF"
                />
                <Button variant="primary" type="submit" children="Send" />
            </div>
            <EmojiContainer
                openEmojis={openEmojis}
                message={message}
                setMessage={setMessage}
            />
            <GifContainer
                openGifs={openGifs}
                randomGifs={randomGifs}
                currentServer={currentServer}
                username={username}
                profileImage={profileImage}
            />
        </form>
    )
}
