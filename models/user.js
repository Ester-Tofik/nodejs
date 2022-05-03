const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');

const adressSchema = new mongoose.Schema({
    street: String,
    city: String,
    country: String
});

const userSchema = new mongoose.Schema({
    email : {
        type: String,
        required : true,
        unique : true,
        validate : [isEmail, "Please💌 enter a valid email address"]
    } ,
    firstName : {
        type : String,
        minlength : 2,
        required : true
    },
    lastName : {
        type : String,
        minlength : 2,
        maxlength : 20,
        required : true
    },
    password : {
        type: String,
        required : true,
        minlength : 4
    },
    adresses: [adressSchema],
    lastVisit : {
        type: Date,
        default : new Date()
    }
}, {timestamps : true,'toJSON': {virtuals: true}  });

userSchema.virtual('orders', {
    ref : 'order',
    localField : '_id',
    foreignField : 'userId'
});
//userSchema.set('toJSON',{ virtual: true } );

module.exports = mongoose.model('user', userSchema);