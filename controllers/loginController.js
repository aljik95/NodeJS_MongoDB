require('dotenv').config()
const crlogin = require('../models/create_login')
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

const login_index = (req,res) =>{
    
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token,process.env.SECRET_TOKEN,(err,decodedToken) =>{
            if(err){
                console.log(err)
                res.render('login',{title :  'Login'});
            }else{
                //console.log(decodedToken)
              if(req._parsedOriginalUrl.pathname == "/login"){
                res.redirect('/cust_list')
              }
              
            }
        })
    }else{
       res.render('login',{title :  'Login'});
    }
}

const login_user = async (req,res) => {
    const {username,password} = req.body
    try {
        const user = await crlogin.findOne({username : username}).lean();
        if(!user){
            return res.json({appStatus : 'error',msg : 'Invalid credentials.'})
        }else{
           if(user.status === '1'){
           // return res.json({appStatus : 'error',msg : 'User already login.'})
           }
        }

        if(await bcrypt.compare(password,user.password)){

            await crlogin.findByIdAndUpdate(user._id,{status : "1"}).catch((err) => {
                return res.json({appStatus :'error',msg : 'System error.'});
            })
            
            const token = jwt.sign({id: user._id, username : user.username},process.env.SECRET_TOKEN)
             res.cookie('jwt',token,{httpOnly: true})
             return res.json({appStatus :'ok',msg : 'successfull',id:user._id});
             
        }else{
            return res.json({appStatus : 'error',msg : 'Invalid credentials.'})
           
        }
    } catch (error) {
        throw error
    }
}
module.exports = {login_index,login_user}