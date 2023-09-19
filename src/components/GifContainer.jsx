import { useState } from 'react'
import '../styles/gif-container.scss'
import axios from 'axios'
import lodash from 'lodash'

import RandomGifList from './RandomGifList'
import SearchedGifList from './SearchedGifList'
import TextField from './TextField'
import Button from './Button'

const GifContainer = ({
    openGifs,
    randomGifs,
    message,
    setMessage,
    currentServer,
    username,
    profileImage,
}) => {
    const [searchTerm, setSearchTerm] = useState('')
    const [gifList, setGifList] = useState([])

    async function getGiphy(searchTerm) {
        if (searchTerm.length > 0) {
            const { data } = await axios.get(`/api/getGiphy/${searchTerm}`)
            setGifList(data)
        } else {
            const { data } = await axios.get('/api/getGiphy/are-you-a-moron')
            setGifList(data)
        }
    }

    return (
        <div className="gif-container" data-open={openGifs}>
            <div className="gif-container-inputs">
                <TextField
                    type="text"
                    callback={setSearchTerm}
                    value={searchTerm}
                    label="Lookup GIFs"
                    placeholder="Lookup GIFs..."
                />
                <Button
                    variant="pink"
                    action={(e) => {
                        e.preventDefault()
                        getGiphy(searchTerm)
                    }}
                >
                    Search GIF
                </Button>
            </div>
            <div className="gif-container-images">
                {gifList && gifList.length > 0 ? (
                    <SearchedGifList
                        gifList={gifList}
                        message={message}
                        setMessage={setMessage}
                        currentServer={currentServer}
                        username={username}
                        profileImage={profileImage}
                    />
                ) : (
                    <RandomGifList
                        randomGifs={randomGifs}
                        message={message}
                        setMessage={setMessage}
                        currentServer={currentServer}
                        username={username}
                        profileImage={profileImage}
                    />
                )}
            </div>
        </div>
    )
}

export default GifContainer
