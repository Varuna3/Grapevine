// App: Component containing the entire application.

import Home from './Mock_Homepage/Home'

export default function App() {
  return (
    <>
      <div>
        <button
          onClick={() => {
            socket.connect()
          }}
        >
          connect
        </button>
        <button
          onClick={() => {
            socket.disconnect()
          }}
        >
          disconnect
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            socket.emit('custom', 'custom text')
          }}
        >
          custom event shenanigans
        </button>
      </div>
      <hr></hr>
      <Home />
    </>
  )
}
