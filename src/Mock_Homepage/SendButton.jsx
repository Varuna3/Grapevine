const SendButton = ({ message }) => {
  return (
    <>
      <button
        onClick={() => {
          socket.emit('client message', { message })
        }}
      >
        Send
      </button>
    </>
  )
}

export default SendButton
