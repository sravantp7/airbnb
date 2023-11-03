const express = require('express')
const router = express.Router()
const Place = require('../models/Place')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// api route for handling add new place to the db
router.post('/', (req, res) => {
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
    } = req.body

    const { token } = req.cookies

    if (token) {
      // used to get the user token so that we can use it as in the place of owner
      jwt.verify(token, process.env.JWT_SECRET_TOKEN, {}, async (err, user) => {
        if (err) {
          throw err
        }
        if (title && address) {
          // creating new place data in the db
          const placeDoc = await Place.create({
            owner: user.id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests,
          })
          res.json(placeDoc)
        } else {
          res.json('Data missing')
        }
      })
    }
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// api end point that will return all places added by the user
// when he loads the my accommodation page, this helps to render the details
router.get('/', (req, res) => {
  try {
    const { token } = req.cookies
    if (token) {
      jwt.verify(
        token,
        process.env.JWT_SECRET_TOKEN,
        {},
        async (err, userData) => {
          if (err) {
            throw err
          } else {
            // searching db for places where owner equals to user from the token (.find() return array of result)
            const places = await Place.find({
              owner: userData.id,
            })
            res.json(places)
          }
        }
      )
    }
  } catch (err) {
    res.status(400).send({ error: err.message })
  }
})

module.exports = router
