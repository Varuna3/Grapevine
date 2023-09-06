import MessageBox from './MessageBox'
import InputBox from './InputBox'
import SendButton from './SendButton'

const Home = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <MessageBox />
      <InputBox />
    </div>
  )
}

export default Home
