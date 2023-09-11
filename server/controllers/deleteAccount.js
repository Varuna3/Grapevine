// Delete Account: Endpoint for deleting a user account.

import bcrypt from 'bcrypt'

import { User } from '../database/seed.js'

export default async function deleteAccount(req, res) {
    // Get user password from response body:
    const { password } = req.body

    // Get currently logged in user:
    const username = req.session.user

    // Try to find and delete user:
    try {
        // Get currently logged in user data:
        const user = await User.findOne({
            where: { username },
        })

        // Compare given passwords checking for match:
        const match = await bcrypt.compare(password, user.passwordHash)

        // Delete user if passwords match:
        if (match === true) {
            // Destroy logged in user in database:
            await user.destroy()
            // Send JSON response back that user was deleted:
            res.json({ Success: `User ${username} successfully deleted.` })
        }
        // Otherwise throw error for mismatched passwords:
        else {
            throw new Error('Passwords do not match!')
        }
    } catch (error) {
        // Otherwise respond with error:
        res.json({
            Error: `Account deletion failed: ${error}`,
        })
    }
}
