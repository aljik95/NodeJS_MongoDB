const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    status :{
        type : String,
        required : true
    }
},{timestamps: true});

const authLogin = mongoose.model('authLogin',authSchema) 

module.exports = authLogin;