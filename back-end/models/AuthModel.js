const mongoose = require('mongoose');

// ! create instance  from mongoose and fill it with object contain the  user info  , every feild contain object with type and default .....
let employeeSchema = new mongoose.Schema({
    fullName: {type: String},
    email: {type: String},
    password: {type: String },
    role: {type: String,default:'client'},
    confirmation: {type: Boolean,default: false},
});


mongoose.model('User', employeeSchema);