import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'
import http from 'http'
import { Server } from 'socket.io'

import { helloWorldHandler } from './controllers/helloworld.js'
import { login } from './controllers/login.js'
import createAccount from './controllers/createAccount.js'
import deleteAccount from './controllers/deleteAccount.js'
import getAllMessages from './controllers/getAllMessages.js'
import logoutAccount from './controllers/logoutAccount.js'
import handleCreateServer from './controllers/createServer.js'
import getUsername from './controllers/getUsername.js'
import getAllServers from './controllers/getAllServers.js'

import { User, Invite, Message, ServerUser } from './database/seed.js'
import createMessage from './controllers/createMessage.js'
import addUserToServer from './controllers/addUserToServer.js'
import createInvite from './controllers/createInvite.js'

//middleware
const app = express()

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

const server = http.createServer(app)
const io = new Server(server)
ViteExpress.config({ printViteDevServerHost: true })

//routes
app.get('/api', helloWorldHandler)
app.get('/api/messages/:serverId', getAllMessages)
app.get('/api/username', getUsername)
app.put('/api/account/', createAccount)
app.put('/api/server', handleCreateServer)
app.put('/api/message', createMessage)
app.put('/api/invite', createInvite)
app.delete('/api/account/', deleteAccount)
app.post('/api/login', login)
app.post('/api/logout/', logoutAccount)
app.post('/api/server/addUser', addUserToServer)
app.get('/api/server/getall', getAllServers)

io.on('connection', (socket) => {
    socket.on('disconnect', () => {})
    socket.on('client message', (data) => {
        io.emit('new message', {
            username: data.username,
            message: data.message,
            server: data.server,
        })
    })
})

server.listen(8000, () => {
    console.log(`Hold ctrl and click this: http://localhost:8000/`)
})

//open server
ViteExpress.bind(app, server)
