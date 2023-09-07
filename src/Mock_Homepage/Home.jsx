import MessageBox from './MessageBox'
import InputBox from './InputBox'
import SendButton from './SendButton'

const Home = ({ messages }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <MessageBox messages={messages} />
      <InputBox />
    </div>
  )
}

export default Home
