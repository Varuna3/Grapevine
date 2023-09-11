// Get all messages endpoint

import { Message, User } from '../database/seed.js'

export default async function getAllMessages(req, res) {
    const serverId = req.params['serverId']

    //get all messages from specific server
    const messages = await Message.findAll({
        where: { serverId: serverId },
        include: { model: User },
    })

    res.send(messages)
}
