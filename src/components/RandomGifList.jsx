import { useState } from 'react'

const RandomGifList = ({randomGifs, message, setMessage}) => {
    return (
        <>
    {randomGifs ? (
        <>
        {randomGifs.map((g) => {
            return (
                <div key={g.id} >
                    <img crossOrigin="anonymous" width="200" src={g.images.downsized.url} />
                </div>
                )
        })}
     </>
    ) : (
        <></>
    )
    }
    </>
    )
}

export default RandomGifList