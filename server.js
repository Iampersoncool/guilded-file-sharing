require('dotenv').config()

const express = require('express')
const path = require('path')
const apiRoutes = require('./routes/api')

const app = express()
app.use(express.static(path.join(__dirname, 'public')))

const PORT = process.env.PORT ?? 3000

app.use('/api', apiRoutes)

app.listen(PORT, () => console.log(`app listening on port ${PORT}`))
