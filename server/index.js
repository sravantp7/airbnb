const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = 5000
require('dotenv').config()
const bcrypt = require('bcryptjs') // for password encryption
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const imageDownload = require('image-downloader')

// routes
const placeRoute = require('./routes/PlaceRoute')

const FRONTEND_URL = process.env.FRONTEND_URL

const bcryptSalt = bcrypt.genSaltSync(10)

// models
const User = require('./models/User') // importing UserModel

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL || 'http://127.0.0.1:5173' || 'http://localhost:5173',
  })
)

app.use(express.json())

// For parsing the cookie in the request so that we can take cookie out from the request header
app.use(cookieParser())

// using custom route
app.use('/api/places', placeRoute)

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
      res.status(200).json(user) // sending entire user data to client
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

        user.password = undefined
        res
          .status(200)
          .cookie('token', jwtToken) // sending token to client through cookie
          .json({
            isLoggedIn: true,
            message: 'Successfully LoggedIn',
            user,
            jwtToken,
          })
      } else {
        res.status(422).json({
          isLoggedIn: false,
          message: 'Login Failed, Wrong password',
        })
      }
    }
  } catch (err) {
    res.status(422).json({ isLoggedIn: false, error: 'Something went wrong' })
  }
})

// This API is used to fetch the user details when he/she load/ refresh the webiste
// it is based on the cookie
app.get('/api/profile', (req, res) => {
  try {
    const { token } = req.cookies // taking out cookie from the request

    // verifying the cookie, user represents the payload which we actually encoded
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, {}, (err, user) => {
        if (err) {
          throw err
        }
        res.json({ name: user.name, email: user.email }) // sending user payload back to client
      })
    } else {
      res.send('no cookie')
    }
  } catch (error) {
    res.json({ error: error.message })
  }
})

// This api end point will allow user to logout
// It will reset the cookie to empty value
app.post('/api/logout', (req, res) => {
  res.cookie('token', '').json('successfully logged out')
})

// upload image by link, using image-downloader package to download the image and saving it into uploads folder
app.post('/api/upload-image-link', async (req, res) => {
  try {
    const { imageURL } = req.body
    let newName = Date.now() + '.jpg'
    const options = {
      url: imageURL,
      dest: __dirname + '/uploads/' + newName,
    }
    await imageDownload.image(options)
    res.send('Image uploaded successfully')
  } catch (err) {
    res.status(404).send('Failed to download image')
  }
})

app.get('*', (req, res) => {
  res.send('Invalid Request')
})

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`)
})
