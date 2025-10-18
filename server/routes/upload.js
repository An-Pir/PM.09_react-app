const express = require('express')
const multer = require('multer')
const path = require('path')

const router = express.Router()


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    // Имя файла: дата+оригинальное имя
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage })

// POST /api/upload — загрузить картинку,
// отдаёт: { url: '/uploads/124889199-espresso.jpg' }
router.post('/', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Нет файла' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

module.exports = router