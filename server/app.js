import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import ViteExpress from 'vite-express'
import Sequelize from 'sequelize'
import bcrypt from 'bcrypt'

import { helloWorldHandler } from './controllers/helloworld.js'
import { loginHandler } from './controllers/userHandlers.js'

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

ViteExpress.config({ printViteDevServerHost: true })

//routes
app.get('/api', helloWorldHandler)

app.post('/api/login', loginHandler)

//open server
ViteExpress.listen(app, 8000, () => {
  console.log(`Hold ctrl and click this: http://localhost:8000/`)
})
