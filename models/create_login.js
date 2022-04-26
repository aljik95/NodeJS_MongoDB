const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CRloginSchema = new Schema({
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

const crlogin = mongoose.model('crlogin',CRloginSchema) 

module.exports = crlogin;