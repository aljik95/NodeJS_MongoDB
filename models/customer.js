const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const custSchema = new Schema({
    FirstName : {
        type : String,
        require : true
    },
    MiddleName : {
        type : String,
        require : true
    },
    LastName : {
        type : String,
        require : true
    },
    BirthDate : {
        type : Date,
        required : true
    },
    PhoneNumber : {
        type : String,
        required : true
    },
    LatestPoints : {
        type : String,
        required : false
    },
    LatestTransac : {
        type : Date,
        required : false
    },
    qrID : {
        type : Number,
        required : true,
        unique : true
    }
},{timestamps: true});

const Customer = mongoose.model('Customer',custSchema) 

module.exports = Customer;