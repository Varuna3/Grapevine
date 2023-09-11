import { Server } from '../database/seed.js'

export default async function createInvite(req, res) {
    if (req.session.user) {
        const { name } = req.body
        const server = await Server.findOne({ where: { name } })
        if (server) {
            // create invite, return invite string so we don't have to make another query to get the string
            const invite = await server.createInvite({
                // sets "invite" = random string of 10 chars, a-z && 0-9
                invite: Math.random()
                    .toString(36)
                    .substring(2, 2 + 10),
            })
            if (invite) {
                res.json({ Success: 'Invite successfully created!' })
            } else {
                res.json({
                    Error: "Invite creation failed. Please try again. (there's like a 1 in 170 quintillion chance you generate an invite that already exists. Congrats!",
                })
            }
        } else {
            res.json({ Error: "Server doesn't exist." })
        }
    } else {
        res.json({ Error: 'Please login.' })
    }
}
