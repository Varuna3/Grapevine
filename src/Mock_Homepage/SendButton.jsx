const SendButton = ({ message }) => {
  return (
    <>
      <button
        onClick={e => {
          e.preventDefault()
          socket.emit('client message', { message })
        }}
      >
        Send
      </button>
    </>
  )
}

export default SendButton
