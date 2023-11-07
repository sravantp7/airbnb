const express = require('express')
const router = express.Router()
const Place = require('../models/Place')
const jwt = require('jsonwebtoken')
require('dotenv').config()

// api end point that will return all places added by the user
// when he loads the my accommodation page, this helps to render the details
router
  .route('/')
  .get((req, res) => {
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
      } else {
        res.status(400).json('No Token Found')
      }
    } catch (err) {
      res.status(400).send({ error: err.message })
    }
  })

  // api route for handling add new place to the db
  .post((req, res) => {
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
        price,
      } = req.body

      const { token } = req.cookies

      if (token) {
        // used to get the user token so that we can use it as in the place of owner
        jwt.verify(
          token,
          process.env.JWT_SECRET_TOKEN,
          {},
          async (err, user) => {
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
                price,
              })
              res.json(placeDoc)
            } else {
              res.json('Data missing')
            }
          }
        )
      }
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })
  // updating already added place
  .put((req, res) => {
    try {
      const {
        id,
        title,
        address,
        addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      } = req.body

      const { token } = req.cookies

      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET_TOKEN,
          {},
          async (err, user) => {
            if (err) {
              throw err
            } else {
              const placeDoc = await Place.findById(id)

              if (user.id != placeDoc.owner.toString()) {
                res.status(400).json('Invalid User')
              }
              // setting the retrived data from db to new values
              placeDoc.set({
                title,
                address,
                photos: addedPhotos,
                description,
                perks,
                extraInfo,
                checkIn,
                checkOut,
                maxGuests,
                price,
              })
              await placeDoc.save() // saving the changes
              res.json(placeDoc)
            }
          }
        )
      }
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })

// end point to fetch place details using id
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const placeById = await Place.findOne({ _id: id }) // fetching the place details using id
    res.json(placeById)
  } catch (error) {
    res.status(400).json({ err: error.message })
  }
})

module.exports = router
