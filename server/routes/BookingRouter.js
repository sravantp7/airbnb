const express = require('express')
const router = express.Router()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const Booking = require('../models/Booking')

router
  .route('/')
  .get((req, res) => {
    res.send('get-booking')
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
          async (err, user) => {
            if (err) {
              throw err
            }
            const booking = await Booking.create({
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
        res.json('no token found')
      }
    } catch (error) {
      res.status(400).json({ err: error.message })
    }
  })

module.exports = router
