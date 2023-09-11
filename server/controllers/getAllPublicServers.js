// Get all public servers

import { Server } from '../database/seed.js'

export default async function getAllServers(req, res) {
    try {
        const servers = await Server.findAll({
            where: { isPrivate : false },
        })
        res.json({ Success: servers })
    } catch {
            res.json({ Error: 'No Servers exist. Try creating one.' })
        }
}
