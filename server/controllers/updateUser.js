// Create Account: Endpoint for creating a user account.

import bcrypt from 'bcrypt'
import { User } from '../database/seed.js'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import sharp from 'sharp'
import dotenv from 'dotenv'
dotenv.config()

const bucketName = process.env.AWS_BUCKET_NAME
const bucketRegion = process.env.AWS_BUCKET_REGION
const accessKey = process.env.ACCESS_KEY
const secretAccessKey = process.env.SECRET_ACCESS_KEY

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
    },
    region: bucketRegion,
})

export default async function updateUser(req, res) {
    let { username, password, email, imageURL } = req.body

    async function saveUser(){
        const loggedInUsername = req.session.user
            let profileImageUrl = ''
    
            const user = await User.findOne({ where: { username: loggedInUsername } })
            
            if(req.files && req.files.imageURL){
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
            // Update a user:
        try {
            // Create password hash using data with whitespace trimmed:
            const passwordHash = bcrypt.hashSync(password.trim(), 10)
    
            user.username = username ? username.trim() : loggedInUsername,
            user.passwordHash =  password ? passwordHash : user.passwordHash
            user.email = email
            user.imageURL = req.files ? profileImageUrl : imageURL,
            req.session.user = user.username
            req.session.imageURL = user.imageURL
    
            await user.save()
    
            // Respond with Success JSON data:
            res.json({
                Success: user,
            })
        } catch (error) {
            // Otherwise respond with error message:
            res.json({
                Error: `Account update failed: ${error}`,
            })
        }
    }

    //check if username is already taken

    if(req.session.user === username){
        saveUser()
    } else if(req.session.user !== username){
        const foundUser = await User.findOne({ where: { username } })
        console.log('foundUser', foundUser)
        if(req.session.user && !foundUser){
            saveUser()
        } else {
            res.send({
                Error: 'Username already taken.',
            })
        }
    } else {
        res.send({
            Error: 'Please Log In.',
        })
    }
}
