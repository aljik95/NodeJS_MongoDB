require('dotenv').config();
const jwt = require('jsonwebtoken');
const Customer = require('../models/customer')


const requireAuth = (req,res,next) =>{
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,(err,decodedToken) =>{
            if(err){
                console.log(err)
                res.redirect('/login')
            }else{
                //console.log(decodedToken)
              if(req._parsedOriginalUrl.pathname == "/login"){
                res.redirect('/cust_list')
              }
                next();
            }
        })
    }else{
        res.redirect('/login')
    }
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;
    

    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,async (err,decodedToken) =>{
            if(err){
                console.log(err)
                res.locals.user = null
                next();
            }else{
                //console.log(decodedToken)
                //let isUser = await Customer.findById(decodedToken.id);
                res.locals.user = decodedToken.username
                //console.log(decodedToken.username)
                next();
            }
        })
    }else{
        res.redirect('/login')
        res.locals.user = null
    }
}

module.exports = {requireAuth,checkUser}