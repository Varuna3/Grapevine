// Get all servers from user

import { Server, User } from '../database/seed.js'

export default async function getAllServers(req, res) {
    if (req.session.user) {
        const username = req.session.user
        try {
            const servers = await User.findOne({
                where: { username },
                include: Server,
            })

            res.json({ Success: servers.servers })
        } catch {
            res.json({ Error: 'There was an error.' })
        }
    } else {
        res.json({ Error: 'Please login to get servers.' })
    }
}
