import { Invite, Server, User } from '../database/seed.js'

export default async function handleJoinServer(req, res) {
    if (req.session.user) {
        const user = await User.findOne({
            where: { username: req.session.user },
        })
        const { inviteString } = req.body
        const invite = await Invite.findOne({ where: { invite: inviteString } })
        if (invite) {
            const { serverId } = invite
            const server = await Server.findOne({ where: { id: serverId } })
            if (server) {
                await server.addUser(user, { through: { isAdmin: false } })
                res.json({ Success: 'Server joined.' })
            } else {
                res.json({ Error: "Server doesn't exist." })
            }
        } else {
            res.json({ Error: 'Invalid invite.' })
        }
    } else {
        res.json({ Error: 'Please login' })
    }
}
