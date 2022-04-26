const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const divisorSchema = new Schema({
    Location : {
        type : String,
        required : true,
        unique : true
    },
    Divisor : {
        type : String,
        required : true
    }
},{timestamps: true});

const divisorModel = mongoose.model('divisorModel',divisorSchema) 

module.exports = divisorModel;