require('dotenv').config()

const express = require('express')
const apiRoutes = require('./routes/api')

const app = express()

const PORT = process.env.PORT ?? 3000

app.get('/', (req, res) => {
  res.sendFile('html/index.html', { root: __dirname })
})

app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
