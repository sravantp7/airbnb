const express = require('express')
const router = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Booking = require('../models/Booking') // importing model

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
          async (err, user) => {
            if (err) throw err

            // fetching all the bookings by the user
            const bookings = await Booking.find({ user: user.id }).populate(
              'place' // name of the field to populate
            )
            res.json(bookings)
          }
        )
      }
    } catch (err) {
      res.status(400).json({ error: err.message })
    }
  })
  .post(async (req, res) => {
    try {
      const {
        place,
        checkIn,
        checkOut,
        noOfGuests,
        name,
        email,
        phone,
        price,
      } = req.body
      const { token } = req.cookies

      if (token) {
        jwt.verify(
          token,
          process.env.JWT_SECRET_TOKEN,
          {},
          async (err, userDoc) => {
            if (err) {
              throw err
            }
            // creating booking doc in the db
            const booking = await Booking.create({
              user: userDoc.id,
              place,
              checkIn,
              checkOut,
              noOfGuests,
              name,
              email,
              phone,
              price,
            })
            res.json(booking)
          }
        )
      } else {
        res.json('')
      }
    } catch (error) {
      res.status(400).json({ err: error.message })
    }
  })

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const response = await Booking.deleteOne({ _id: id })
    res.json(response)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

module.exports = router
