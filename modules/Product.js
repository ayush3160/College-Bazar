const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name : {
    type : String,
    required : true
  },
  description : {
    type : String,
    required : true
  },
  publishedAt : {
    type : Date,
    required : true
  },
  price : {
    type : Number,
    required : true
  },
  user : {
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  },
  category : {
    type : String
  }
});

const Product = new mongoose.model("Product", productSchema);

module.exports = Product;
