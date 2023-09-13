import { Message, Server, ServerUser, User } from '../database/seed.js'

export default async function deleteServer(req, res) {
    if (req.session.user) {
        const server = await Server.findOne({ where: { id: req.body.id } })
        if (server) {
            const user = await User.findOne({
                where: { username: req.session.user },
            })
            const isAdmin = await ServerUser.findOne({
                where: { userId: user.id, serverId: server.id },
            })
            if (isAdmin) {
                const messages = await Message.findAll({
                    where: { serverId: server.id },
                })
                messages.forEach(async (e) => await e.destroy())
                await server.destroy()
                res.json({ Success: `Server '${server.name}' deleted.` })
            } else {
                res.json({ Error: 'Not an admin!' })
            }
        } else res.json({ Error: 'the server doesnt exist bro' })
    } else {
        res.json({ Error: 'Please login.' })
    }
}
