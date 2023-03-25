const mongoose = require('mongoose')
require('dotenv').config()
const port = '27017'
const db = 'SoundScapeDB'

mongoose.set('strictQuery', false)
mongoose
  .connect(`mongodb://127.0.0.1/SoundScapeDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Successfully connected to database`)
  })
  .catch((err) => console.error(err))
