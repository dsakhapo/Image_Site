const express = require('express');
const multer = require('multer');
const Image = require('../models/image');

const router = express.Router();

//File-filter for multer
function fileFilter(req, file, cb){
  const mimetype = file.mimetype;
  if(mimetype != 'image/jpg' && mimetype != 'image/jpeg' && mimetype != 'image/png'){
    cb(null, false);
    req.fileValidationError = 'Invalid file type. Please upload an image.';
  } else {
    cb(null, true);
  }
};

const upload = multer({dest: 'uploads/', fileFilter: fileFilter});

//Routes
router.get('/uploads', function(req, res, next){
  Image.find({}).then(function(images){
    res.send(images);
  });
});

router.post('/upload', upload.single('file'), function(req, res, next){
  if(req.fileValidationError){
     return next(new Error(req.fileValidationError));
  }else{
    Image.create({name: req.file.filename, path: '/' + req.file.path}).then(function(image){
      res.send(image);
    });
  }
});

module.exports = router;
