import { Server, User, ServerUser } from '../database/seed.js'

export default async function addUserToServer(req, res) {
  if (req.session.user) {
    const username = req.session.user
    const { serverName, isAdmin } = req.body
    try {
      const user = await User.findOne({ where: { username } })

      const server = await Server.findOne({ where: { name: serverName } })

      await server.addUser(user, { through: { isAdmin } })
      res.json({ Success: "Nothin' went askew. 'Grats." })
    } catch {
      res.json({ Error: 'Either the user or server does not exist.' })
    }
  } else {
    res.json({ Error: 'Please login.' })
  }
}
