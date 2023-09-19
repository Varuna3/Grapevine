import { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'

const RandomGifList = ({
    randomGifs,
    message,
    setMessage,
    currentServer,
    username,
    profileImage,
}) => {
    return (
        <>
            {randomGifs ? (
                <>
                    {randomGifs.map((g) => {
                        return (
                            <img
                                key={g.id}
                                crossOrigin="anonymous"
                                src={g.images.downsized.url}
                                onClick={async () => {
                                    const { data } = await axios.put(
                                        '/api/message',
                                        {
                                            server: currentServer.name,
                                            message: `<img src="${g.images.downsized.url}" />`,
                                        }
                                    )
                                    if (data.Success) {
                                        socket.emit('client message', {
                                            username,
                                            message: `<img src="${g.images.downsized.url}" />`,
                                            server: currentServer.id,
                                            userImage: profileImage,
                                        })
                                    } else {
                                        toast.error('Something went wrong.')
                                    }
                                }}
                            />
                        )
                    })}
                </>
            ) : (
                <></>
            )}
        </>
    )
}

export default RandomGifList
