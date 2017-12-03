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

router.get('/image/*', function(req, res, next){
  //Get the name of the image
  var url = req.url;
  var image_name = url.substr(url.lastIndexOf('/') + 1);

  Image.find({'name': image_name}).then(function(image){
    var html = "<!DOCTYPE html>\n<html>\n    <head>\n    </head>\n <body>\n"  +
    "<img src=\"http://localhost:4000/" + image_name + "\"/>\n" +  "</body>\n</html>";

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  });
});

router.post('/upload', upload.single('file'), function(req, res, next){
  if(req.fileValidationError){
     return next(new Error(req.fileValidationError));
  }else{
    Image.create({'name': req.file.filename, 'path': '/' + req.file.path}).then(function(image){
      res.send(image);
    });
  }
});

module.exports = router;
