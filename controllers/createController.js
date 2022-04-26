require('dotenv').config()
const crlogin = require('../models/create_login')
const bcrypt = require("bcryptjs");



const create_index = (req,res) =>{
    res.render('create_account',{title :  'Create Account'});
}

const create_account = async (req,res) =>{
    const {username,password : plainText,status} = req.body
    const password = await bcrypt.hash(plainText,10)

    try{
        const response = await crlogin.create({
            username,password,status
        })
        res.json({status : 'ok',msg : 'Successfully Created.'})
        
    }catch(msg){
        if(msg.code === 11000){
            return res.json({status : 'error',msg : 'Username already in used.'})
        }
        throw msg
    }
}
module.exports = {create_index,create_account}