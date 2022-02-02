const multer = require("multer")

exports.uploadFile = (imageFile) => {
  // code here
  // make destination file for upload
 
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads") // file storage destination
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname.replace(/\s/g, ""))
    }
  })

  // file filter based on extension file
  const fileFilter = function (req, file, cb) {
  
    if (file.fieldname === imageFile) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = {
          message: "Only image file allowed"
        }
        return cb(new Error("Only image file allowed"), false)
      }
    }
    cb(null, true)
  }
  const sizeInMB = 10
  const maxSize = sizeInMB * 1000 * 1000

  // Generate setting multer
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: maxSize
    }
  }).fields(
    [
      { 
        name: 'image', 
        maxCount: 1 
      }, 
      { 
        name: 'music', 
        maxCount: 1 
      }
    ])

  // middleware handler
  return (req, res, next) => {
    upload(req, res, function (err) {
      // show an error if validation error
      if (req.fileValidationError)
        return res.status(400).send(req.fileValidationError)
      console.log(req.files)
      // show an error if file doesnt provided requirement
      if (!req.files && !err)
        return res.status(400).send({
          message: "Please select files upload"
        })

      // show an error if it bigger than max size
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(400).send({
            message: "Max file sized 10mb"
          })
        }
        return res.status(400).send(err)
      }

      // if okay next to controller
      return next()
    })
  }
};