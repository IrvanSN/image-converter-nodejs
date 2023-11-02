const express = require('express');
const router = express.Router();
const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb)=>{
    cb(null, '../public/uploads')
  },
  filename: (req, file, cb)=>{
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })

router.get('/', (req, res) => {
  res.render('index', { title: 'Image Converter NodeJS' });
});

router.post('/', upload.single('file'), (req, res) => {
  const file = req.file
  const {to_format} = req.body

  if (to_format === 'jpeg') {
    console.log(file)
  }


  res.status(200).json({})
})

module.exports = router;
