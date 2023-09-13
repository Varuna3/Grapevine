// Get all public servers

import { Server, Sequelize, User } from '../database/seed.js'

export default async function getAllServers(req, res) {
    if (req.session.user) {
        const user = await User.findOne({
            where: { username: req.session.user },
            include: Server,
        })
        const serverIds = user.servers.map((e) => e.id)
        // try {
        const servers = await Server.findAll({
            where: {
                isPrivate: false,
                id: { [Sequelize.Op.not]: [...serverIds] },
            },
        })
        console.log(servers)
        res.json({ Success: servers })
        // } catch {
        //     res.json({ Error: 'No Servers exist. Try creating one.' })
        // }
    } else {
        res.json({ Error: 'Please login.' })
    }
}
