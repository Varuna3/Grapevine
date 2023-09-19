// Get all servers from user

import { Server, User } from '../database/seed.js'

export default async function getAllServers(req, res) {
    if (req.session.user) {
        const username = req.session.user
        try {
            const user = await User.findOne({
                where: { username },
                include: Server,
            })
            if (user.servers) {
                console.log(user.servers)
                res.json({ Success: user.servers })
            } else {
                res.json({ Error: 'User does not exist.' })
            }
        } catch {
            res.json({
                Error: 'There was an error. User probably does not exist.',
            })
        }
    } else {
        res.json({ Error: 'Please login to get servers.' })
    }
}
