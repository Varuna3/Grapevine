import { Invite } from '../database/seed.js'

export default async function deleteInvite(req, res) {
    if (req.session.user) {
        const { inviteString } = req.body
        console.log(inviteString)
        try {
            const invite = await Invite.findOne({
                where: { invite: inviteString },
            })
            await invite.destroy()
            res.json({ Success: 'Invite successfully deleted.' })
        } catch {
            res.json({ Error: 'Invite probably does not exist.' })
        }
    } else {
        res.json({ Error: 'Please login.' })
    }
}
