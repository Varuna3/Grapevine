import { useState } from 'react'
import '../styles/gif-container.scss'
import axios from 'axios'

import RandomGifList from './RandomGifList'
import SearchedGifList from './SearchedGifList'

const GifContainer = ({ openGifs, randomGifs, message, setMessage }) => {

    const [searchTerm, setSearchTerm] = useState('')
    const [gifList, setGifList] = useState([]);

    async function getGiphy(searchTerm) {
        const { data } = await axios.get(`/api/getGiphy/${searchTerm}`)
        setGifList(data)
    }

    return (
        <>
        {openGifs ? (
        <div className="gif-container">
            <input 
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                id="searchTerm"
                name="searchTerm"
            />
            <button  onClick={(e) => {
                e.preventDefault() 
                getGiphy(searchTerm)
                }}> Search GIF</button>
                {gifList && gifList.length > 0 ? (
                    <SearchedGifList
                    gifList={gifList}
                    message={message} 
                    setMessage={setMessage}/>
                ) : (
                    <RandomGifList 
                        randomGifs={randomGifs} 
                        message={message} 
                        setMessage={setMessage}/>
                )
            }
        </div>
        ) : (
            <></>
        )}
        </>
    )
}

export default GifContainer;

