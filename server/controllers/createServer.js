import { Server } from '../database/seed.js'

export default async function handleCreateServer(req, res) {
    let { name, imageURL, isPrivate } = req.body
    imageURL ||= 'https://placehold.co/256x256?text=' + name.charAt(0)

    try {
        await Server.create({
            name,
            imageURL,
            isPrivate,
        })

        res.send({ Success: `Server ${name} successfully created.` })
    } catch {
        res.send({ Error: 'Server creation failed. Please try again.' })
    }
}
