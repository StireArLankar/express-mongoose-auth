const express = require('express')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')

dotenv.config()
const port = process.env.SERVER_PORT

const app = express()

app.use(express.json())

app.use('/api/user', authRoute)

app.listen(3000, () => console.log('Server Up and running'))
