import { Server } from '../database/seed.js'

export default async function deleteServer(req, res) {
    if (req.session.user) {
        const server = await Server.findOne({ where: { id: req.body.id } })
        if (server) {
            await server.destroy()
            res.send({ Success: `Server '${server.name}' deleted.` })
        } else res.json({ Error: 'the server doesnt exist bro' })
    } else {
        res.json({ Error: 'Please login.' })
    }
}
