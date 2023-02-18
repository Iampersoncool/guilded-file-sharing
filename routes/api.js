const FormData = require('form-data')
const fs = require('fs')
const validator = require('validator').default
const express = require('express')
const multer = require('multer')
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args))

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image'))
      return cb('Invalid image file', false)

    cb(null, true)
  },
})

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { originalname, buffer } = req.file

    const payload = {
      embeds: [
        {
          title: `Image uploaded`,
          description: `A new image was uploaded: ${originalname}`,
        },
      ],
    }

    const formData = new FormData()
    formData.append('payload_json', JSON.stringify(payload))
    formData.append('file', buffer, { filename: originalname })

    const response = await fetch(process.env.GUILDED_WEBHOOK_URL, {
      method: 'POST',
      body: formData,
    })

    const json = await response.json()
    const imageUrl = json.content.document.nodes[0].data.src

    res.send(imageUrl)
  } catch (e) {
    console.log(e)
    res.status(500).send('Error uploading file')
  }
})

module.exports = router
