export default async function deleteMessage(req, res) {
    if (req.session.user) {
        const { message, serverId, userId } = req.body
        if (message && serverId && userId) {
        } else {
            res.json({ Error: 'Something went wrong.' })
        }
    } else {
        res.json({ Error: 'Please login.' })
    }
}
