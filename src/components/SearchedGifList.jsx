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
                    <img
                        key={gif.id}
                        crossOrigin="anonymous"
                        src={gif.images.downsized.url}
                        onClick={async () => {
                            const { data } = await axios.put('/api/message', {
                                server: currentServer.name,
                                message: `<img src="${gif.images.downsized.url}" />`,
                            })
                            if (data.Success) {
                                socket.emit('client message', {
                                    username,
                                    message: `<img src="${gif.images.downsized.url}" />`,
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
    )
}

export default SearchedGifList
