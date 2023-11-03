const express = require('express');
const router = express.Router();
const multer = require('multer')
const sharp = require('sharp')

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(
        null,
        `${file.fieldname}-${new Date().getTime()}.${
            file.originalname.split('.')[file.originalname.split('.').length - 1]
        }`,
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
      file.mimetype === 'image/png'
      || file.mimetype === 'image/jpg'
      || file.mimetype === 'image/jpeg'
      || file.mimetype === 'image/webp'
      || file.mimetype === 'image/svg+xml'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: fileStorage,
  limits: { fileSize: 1024 * 1024 * 30 },
  fileFilter,
}).single('file')

router.get('/', (req, res) => {
  res.render('index', { title: 'Image Converter NodeJS' });
});

router.post('/upload', (req, res) => {
  return upload(req, res, async (err) => {
    const file = req.file
    const {resize, width, height, fit_chosen, compressed, quality, change_mimetype, to_format} = req.body

    const filenameSplit = file.filename.split('.')
    const originalFileExtension = filenameSplit[filenameSplit.length - 1]

    if (err instanceof multer.MulterError) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }

    if (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }

    const image = sharp(file.path)

    if (resize === 'on') {
      image
          .resize({
            width: parseInt(width),
            height: parseInt(height),
            fit: fit_chosen
          })
    }

    if (compressed === 'on') {
      image
          .toFormat(to_format, {quality: parseInt(quality)})
    }

    if (change_mimetype === 'on') {
      image
          .toFormat(to_format)
    }

    const resultImagePath = `public/uploads/output-${new Date().getTime()}.${change_mimetype !== 'on' ? originalFileExtension : to_format}`

    image
        .toFile(resultImagePath)
        .then(() => res.redirect('/' + resultImagePath.split('public/')[1]))
  })
})


module.exports = router;
