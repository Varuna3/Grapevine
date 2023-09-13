// Create Account: Endpoint for creating a user account.

import bcrypt from 'bcrypt'

import { User } from '../database/seed.js'

export default async function createAccount(req, res) {
    // Get all new user data from request body:
    let { username, password, email, imageURL } = req.body

    // Try to create a new user:
    try {
        // Create password hash using data with whitespace trimmed:
        const passwordHash = bcrypt.hashSync(password.trim(), 10)
        let profileImageUrl = ''
        // Create placeholder image using first character of username when imageURL is falsy:
        imageURL ||= 'https://placehold.co/256x256?text=' + username.charAt(0)


        if (req.files && req.files.imageURL) {
            var file = req.files.imageURL
            var optimized = await sharp(file.data)
                .resize(60, 60, { fit: 'inside', withoutEnlargement: true })
                .toBuffer()
            const profileimage = {
                Bucket: bucketName,
                Key: file.name,
                Body: optimized,
                ContentType: file.mimetype,
            }
            const comm = new PutObjectCommand(profileimage)
    
            await s3.send(comm)
            profileImageUrl = `https://grapevinedev.s3.us-west-2.amazonaws.com/${file.name}`
        }

        // Create new user in the database table:
        await User.create({
            username: username.trim(),
            passwordHash,
            email,
            imageURL: req.files ? profileImageUrl : imageURL,
        })

        // Respond with Success JSON data:
        res.json({
            Success: `User ${username} successfully created.`,
        })
    } catch (error) {
        // Otherwise respond with error message:
        res.json({
            Error: `Account creation failed: ${error}`,
        })
    }
}
