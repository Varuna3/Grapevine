import { Message, User } from '../database/seed.js'

export default async function deleteMessage(req, res) {
    if (req.session.user) {
        const { message, serverId, username } = req.body
        if (message && serverId && username) {
            const u = await User.findOne({ where: { username } })
            const m = await Message.findOne({
                where: { userId: u.id, serverId, message },
            })
            await m.destroy()
            res.json({ Success: 'Message Deleted.' })
        } else {
            res.json({ Error: 'Something went wrong.' })
        }
    } else {
        res.json({ Error: 'Please login.' })
    }
}
