const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 5000
require('dotenv').config()
const bcrypt = require('bcryptjs') // for password encryption
const jwt = require('jsonwebtoken')

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
  try {
    const { name, email, password } = req.body

    // verifying inputs
    if (!(name && email && password)) {
      res.status(422).json({
        message: 'Registration failed, Please provide name , email & password',
      })
    } else {
      // creating a new user
      const user = await User.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt), // password encryption
      })

      user.password = undefined // setting password inside user to undefined
      res.json(user) // sending entire user data to client
    }
  } catch (err) {
    res.status(422).json({ error: err.message })
  }
})

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // validating  user inputs
    if (!(email && password)) {
      res.status(422).json({
        isLoggedIn: false,
        message: 'Login Failed, Please provide email & password',
      })
    }

    // fetching user details from db using email address
    const user = await User.findOne({
      email,
    })

    // Authenticating user
    if (user) {
      // comparing password used for login with registered encrypted password
      const passwordOk = bcrypt.compareSync(password, user.password)
      if (passwordOk) {
        // Creating a JWT token
        const jwtToken = jwt.sign(
          { id: user._id, name: user.name, email: user.email }, // payload
          process.env.JWT_SECRET_TOKEN, // secret key
          { expiresIn: '1h' } // adding expire time to token
        )

        res.status(200).json({
          isLoggedIn: true,
          message: 'Successfully LoggedIn',
          jwtToken,
        })
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
