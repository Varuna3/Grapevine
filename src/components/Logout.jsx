import axios from 'axios'

export default function Logout({ setShowModal }) {
  return (
    <button
      onClick={async () => {
        await axios.post('/api/logout')
        setShowModal(true)
      }}
    >
      Logout
    </button>
  )
}
