const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 5000
require('dotenv').config()
const bcrypt = require('bcryptjs') // for password encryption

const bcryptSalt = bcrypt.genSaltSync(10)

// models
const User = require('./models/User') // importing UserModel

app.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173',
  })
)

app.use(express.json())

// Connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(`Error - ${err.message}`))

app.get('/', (req, res) => {
  res.send('Welcome to Airbnb API')
})

app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body

  try {
    // creating a new user
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt), // password encryption
    })
    res.send(user)
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body

  try {
    // fetching user details from db
    const user = await User.findOne({
      email,
    })
    if (user) {
      // comparing password used for login with registered encrypted password
      const passwordOk = bcrypt.compareSync(password, user.password)
      if (passwordOk) {
        res.json({ isLoggedIn: true, message: 'Successfully LoggedIn' })
      } else {
        res.status(422).json({
          isLoggedIn: false,
          message: 'Login Failed, Wrong passsword',
        })
      }
    }
  } catch (err) {
    res.status(422).json({ isLoggedIn: false, error: 'Something went wrong' })
  }
})

app.get('*', (req, res) => {
  res.send('Invalid Request')
})

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`)
})