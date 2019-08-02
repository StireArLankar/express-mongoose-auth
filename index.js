const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
// Routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')

dotenv.config()
const port = process.env.SERVER_PORT

const app = express()

mongoose.connect(
  process.env.MDB,
  { useNewUrlParser: true },
  () => console.log('Connected to DB')
)

app.use(express.json())

app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)

app.listen(port, () => console.log('Server Up and running'))
