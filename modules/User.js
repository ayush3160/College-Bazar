const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minlength : 3
    },
    email : {
        type : String,
        unique : true,
        required : true,
    },
    password : {
        type : String,
        unique : true,
        required : true
    },
    cart : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'Product'
        }
    ]
})

const User = new mongoose.model('User',userSchema);

module.exports = User;