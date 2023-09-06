// App: Component containing the entire application.

import { useEffect } from 'react'

export default function App() {
  const customShenanigansHandler = () => {
    socket.emit('custom', 'custom text')
  }
  useEffect(() => {
    socket.connect()
    socket.on('custom', data => {
      console.log(data)
    })
  }, [])

  return (
    <>
      <div>
        <button onClick={customShenanigansHandler}>
          custom event shenanigans
        </button>
      </div>
    </>
  )
}
