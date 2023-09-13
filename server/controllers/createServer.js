import { Server } from '../database/seed.js'
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

export default async function handleCreateServer(req, res) {
    let { name, imageURL, isPrivate } = req.body
    let serverImageUrl = ''
    imageURL ||= 'https://placehold.co/256x256?text=' + name.charAt(0)

    if (req.files && req.files.serverImage) {
        var file = req.files.serverImage
        var optimized = await sharp(file.data)
            .resize(60, 60, { fit: 'inside', withoutEnlargement: true })
            .toBuffer()
        const serverimage = {
            Bucket: bucketName,
            Key: file.name,
            Body: optimized,
            ContentType: file.mimetype,
        }
        const comm = new PutObjectCommand(serverimage)

        await s3.send(comm)
        serverImageUrl = `https://grapevinedev.s3.us-west-2.amazonaws.com/${file.name}`
    }

    try {
        await Server.create({
            name,
            imageURL: req.files ? serverImageUrl : imageURL,
            isPrivate,
        })

        res.send({ Success: `Server ${name} successfully created.` })
    } catch {
        res.send({ Error: 'Server creation failed. Please try again.' })
    }
}
