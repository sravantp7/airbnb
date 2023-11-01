const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.send('Got a place route')
})

module.exports = router
