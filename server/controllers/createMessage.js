import axios from 'axios'
import { User, Server, Message } from '../database/seed.js'

// PUT /api/server {message: 'some message here', server: 'server-name'}
const createMessage = async (req, res) => {
    const { server, message } = req.body
    if (server && message) {
        const user = await User.findOne({
            where: { username: req.session.user },
        })
        const s = await Server.findOne({ where: { name: server } })
        if (user && s) {
            try {
                const m = await user.createMessage({
                    message: message,
                    serverId: Number(s.id),
                })
                res.send({ Success: true })
            } catch {
                res.send({
                    Error: 'Message could not be stored. Please try again.',
                })
            }
        } else {
            res.send({
                Error: 'You probably forgot to login, or the server does not exist. Please try again.',
            })
        }
    } else {
        res.send({ Error: 'Either server name or message are empty.' })
    }
}

export default createMessage
