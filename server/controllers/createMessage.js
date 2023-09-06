import axios from 'axios'
import { User, Invite, Server, Message, ServerUser } from '../database/seed.js'

const createMessage = async (req, res) => {
  const user = await User.findOne({ where: { username: req.session.user } })
  const s = await Server.findOne({ where: { name: server } })
  const { server, message } = req.body
  const m = await Message.create({ message, serverId: s.id })
  res.send({ Success: true })
}

export default createMessage
