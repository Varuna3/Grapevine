import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import http from 'http'
import fileUpload from 'express-fileupload'
import cors from 'cors'
import { Server } from 'socket.io'
import axios from 'axios'

import { helloWorldHandler } from './controllers/helloworld.js'
import { login } from './controllers/login.js'
import createAccount from './controllers/createAccount.js'
import deleteAccount from './controllers/deleteAccount.js'
import getAllMessages from './controllers/getAllMessages.js'
import logoutAccount from './controllers/logoutAccount.js'
import handleCreateServer from './controllers/createServer.js'
import getUsername from './controllers/getUsername.js'
import getAllServers from './controllers/getAllServers.js'
import createMessage from './controllers/createMessage.js'
import addUserToServer from './controllers/addUserToServer.js'
import createInvite from './controllers/createInvite.js'
import handleJoinServer from './controllers/handleJoinServer.js'
import deleteInvite from './controllers/deleteInvite.js'
import getAllPublicServers from './controllers/getAllPublicServers.js'
import getInvites from './controllers/getInvites.js'
import deleteServer from './controllers/deleteServer.js'
import updateUser from './controllers/updateUser.js'
import getGiphy from './controllers/getGiphy.js'
import randomGifs from './controllers/randomGifs.js'
import deleteMessage from './controllers/deleteMessage.js'

//middleware
const app = express()

app.use(
    cors({
        origin: '*',
    })
)

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'))
app.use(
    session({
        secret: 'L3TM30UT-1MSTUCK1NY0URP0CK3T',
        resave: false,
        saveUninitialized: false,
    })
)
app.use(fileUpload())

const server = http.createServer(app)
const io = new Server(server)
ViteExpress.config({ printViteDevServerHost: true })

//routes
app.get('/api', helloWorldHandler)
app.get('/api/server/getall', getAllServers)
app.get('/api/messages/:serverId', getAllMessages)
app.get('/api/invites/:serverId', getInvites)
app.get('/api/username', getUsername)
app.put('/api/account/', createAccount)
app.put('/api/update/', updateUser)
app.put('/api/server', handleCreateServer)
app.put('/api/message', createMessage)
app.put('/api/invite', createInvite)
app.delete('/api/account/', deleteAccount)
app.delete('/api/invite', deleteInvite)
app.delete('/api/server', deleteServer)
app.delete('/api/message', deleteMessage)
app.post('/api/login', login)
app.post('/api/logout/', logoutAccount)
app.post('/api/server/addUser', addUserToServer)
app.post('/api/server/join', handleJoinServer)
app.get('/api/server/getall', getAllServers)
app.get('/api/server/getpubservers', getAllPublicServers)
app.get('/api/getgiphy/:searchterm', cors(), getGiphy)
app.get('/api/randomgifs', cors(), randomGifs)

io.on('connection', (socket) => {
    socket.on('disconnect', () => {})
    socket.on('client message', (data) => {
        io.emit('new message', {
            username: data.username,
            message: data.message,
            server: data.server,
            userImage: data.userImage,
        })
    })
    socket.on('delete message', (data) => {
        io.emit('delete message', {
            message: data.message,
            username: data.username,
            serverId: data.serverId,
            key: data.key,
        })
    })
    socket.on('secret', async (data) => {
        const { secret } = data
        if (secret === 'kyle') {
            try {
                const { data } = await axios.get('http://localhost:5000/kyle')
                io.emit('secret', {
                    secret: data,
                })
            } catch {
                io.emit('secret error', {
                    error: 'Classified.',
                })
            }
        } else {
            io.emit('secret error', {
                error: 'Classified',
            })
        }
    })
})

server.listen(8000, () => {
    console.log(`Hold ctrl and click this: http://localhost:8000/`)
})

//open server
ViteExpress.bind(app, server)
