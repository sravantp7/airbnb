const express = require('express')
const app = express()
const PORT = 5000
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/test', (req, res) => {
  res.send('Test Ok')
})

app.listen(PORT, () => {
  console.log(`Server is running on Port : ${PORT}`)
})
