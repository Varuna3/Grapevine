import bcrypt from 'bcrypt'
import { User } from '../database/seed.js'

export async function loginHandler(req, res) {
  let { username, password } = req.body
  const user = await User.findOne({ where: { username } })
  if (user) {
    bcrypt.compare(password, user.passwordHash, async (err, valid) => {
      if (valid) {
        req.session.id = user.id
        res.send({ Success: true })
      } else {
        res.send({ Error: 'Error: Authentication failed.' })
      }
    })
  }
}
