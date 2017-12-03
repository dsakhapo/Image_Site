const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema and Model for storing image references
const ImageSchema = new Schema({
  name: {
    type: String
  },

  path: {
    type: String
  }
});

const Image = mongoose.model('image', ImageSchema);

module.exports = Image;
