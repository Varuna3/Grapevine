import axios from 'axios'

const SearchedGifList = ({
    message,
    setMessage,
    gifList,
    currentServer,
    username,
    profileImage,
}) => {
    return (
        <>
            {gifList.map((gif) => {
                return (
                    <div key={gif.id}>
                        <img
                            crossOrigin="anonymous"
                            width="200"
                            src={gif.images.downsized.url}
                            style={{ border: '2px solid cyan' }}
                            onClick={async () => {
                                const { data } = await axios.put(
                                    '/api/message',
                                    {
                                        server: currentServer.name,
                                        message: `<div style='height: 200px'><img src="${gif.images.downsized.url}" style='max-height: 200px' /></div>`,
                                    }
                                )
                                if (data.Success) {
                                    socket.emit('client message', {
                                        username,
                                        message: `<div style='height: 200px'><img src="${gif.images.downsized.url}" style='max-height: 200px' /></div>`,
                                        server: currentServer.id,
                                        userImage: profileImage,
                                    })
                                } else {
                                    toast.error('Something went wrong.')
                                }
                            }}
                        />
                    </div>
                )
            })}
        </>
    )
}

export default SearchedGifList