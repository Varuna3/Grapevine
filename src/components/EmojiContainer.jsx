import '../styles/emoji-container.scss'
import data from '../assets/Emojis.json'

import lodash from 'lodash'

export default function EmojiContainer({ openEmojis, message, setMessage }) {
    let ids = 0
    const emojis = data.EMOJIS.map((e) => {
        ids++
        return (
            <div
                key={ids}
                onClick={() => {
                    setMessage(message + e)
                }}
            >
                {e}
            </div>
        )
    })

    return (
        <>
            {openEmojis ? (
                <div className="emoji-container">{emojis}</div>
            ) : (
                <></>
            )}
        </>
    )
}
