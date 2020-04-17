const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var productSchema = new Schema({
    title:  {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: String,
    meta: {
      rating: Number
    }
  });

  module.exports = mongoose.model('Product', productSchema);