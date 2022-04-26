const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const custPointsSchema = new Schema({
    refID : {
        type : String,
        required : true
    },
    Location : {
        type : String,
        required : true
    },
    Amount : {
        type : String,
        required : true
    },
    Divisor : {
        type : String,
        required : true
    },
    Points : {
        type : String,
        required : true
    }
},{timestamps: true});

const CustomerPoints = mongoose.model('CustomerPoints',custPointsSchema) 

module.exports = CustomerPoints;