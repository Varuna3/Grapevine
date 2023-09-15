const SearchedGifList = ({ message, setMessage, gifList }) => {
return (
    <>
    {gifList.map((gif) => {
        return (
            <div key={gif.id}>
                <img crossOrigin="anonymous" width="200" src={gif.images.downsized_medium.url} />
            </div>
            )
    })}
    </> 
)
}

export default SearchedGifList