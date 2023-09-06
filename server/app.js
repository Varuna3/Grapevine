import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import Sequelize from 'sequelize'
import http from 'http'
import { Server } from 'socket.io'

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
app.get('/api', (req, res) => {
  res.send('Hello World!')
})

io.on('connection', socket => {
  socket.on('disconnect', () => {})
  socket.on('custom', data => {
    io.emit('custom', 'custom event hit (frontend message)')
    console.log('custom event hit (backend message)')
  })
})

server.listen(8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})

//open server
ViteExpress.bind(app, server)
