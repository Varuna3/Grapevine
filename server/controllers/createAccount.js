import bcrypt from 'bcrypt'
import { User } from '../database/seed.js'

export default async function createAccount(req, res) {
    let { username, password, email } = req.body

    try {
        // trimming here because we want to be quirky and different
        const passwordHash = bcrypt.hashSync(password.trim(), 10)
        const imageURL =
            'https://placehold.co/256x256?text=' + username.charAt(0)

        await User.create({
            // again - we are so quirky and cool (sunglasses emoji)
            username: username.trim(),
            passwordHash,
            email,
            imageURL,
        })

        res.json({
            Success: `User ${username} successfully created.`,
        })
    } catch (error) {
        res.json({
            Error: `Account creation failed: ${error}`,
        })
    }
}
