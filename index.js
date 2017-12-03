const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Connect to mongodb
mongoose.connect('mongodb://localhost/image_site');
mongoose.Promise = global.Promise;

//Serve html, css, js pages
app.use(express.static('public'));

//Serve images
app.use(express.static('uploads'));

//Initialize routes
app.use(require('./routes/api'));

//Error-handling middleware
app.use(function(err, req, res, next){
  res.status(500).send({error: err.message});
});

//Listen for requests
app.listen(4000, function(){
  console.log('Now listening for requests.');
});
