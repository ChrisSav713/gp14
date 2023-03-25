const express = require('express')
const cors = require('cors')
const app = express()
const port = 8000

const corsConfig = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: true,
  optionsSuccessStatus: 204
}
app.use(cors(corsConfig))
app.use(express.json())
//app.use(express.urlencoded({ extended: true}))
app.use(express.urlencoded({ extended: false }))

require('./config/mongoose.config')

const userRoutes = require('./routes/user.routes.js')
userRoutes(app)

app.listen(port, () => console.log(`Server running on port ${port}`))
