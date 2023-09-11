import { Invite } from '../database/seed.js'

export default async function getInvites(req, res) {
    if (req.session.user) {
        const { serverId } = req.params
        const invites = await Invite.findAll({
            where: { serverId },
            attributes: ['invite'],
        })
        res.json({ Success: invites })
    } else {
        res.json({ Error: 'Please login.' })
    }
}
