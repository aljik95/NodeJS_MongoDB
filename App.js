const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')

//Routes
const loginRoute = require('./routes/loginRoutes')
const createRoute = require('./routes/createRoutes')
const cust_listRoutes = require('./routes/cust_listRoutes')
const cust_registerRoutes = require('./routes/cust_registerRoutes')
const cust_detailsController = require('./routes/cust_detailsRoutes')
const change_passController = require('./routes/change_passRoutes')
const {requireAuth,checkUser,ifLogin} = require('./middleware/authMiddleware')


const mongoose = require ('mongoose');

//Initialize
const app = express();

//connect DB

const dbURI = 'mongodb+srv://rm_station:EMfp81ae8BZp5Koy@cluster0.gqxop.mongodb.net/RM_STATION?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser : true,useUnifiedTopology : true}).then((result) => app.listen(5000)).catch((err) => console.log(err));


//Middleware
//app.use(morgan('dev'));
app.use(bodyParser.json());
app.set('view engine','ejs');
app.use(express.urlencoded({extended : true}));
app.use(express.static(__dirname + '/public'));
app.use(cookieParser())

 app.get('/',requireAuth,(req,res) =>{
    res.redirect('cust_list');
 })
 app.use('/login',loginRoute);

 app.get('*',checkUser);
 app.use('/create_account',requireAuth,createRoute);

 app.use('/cust_list',requireAuth,cust_listRoutes);

 app.use('/cust_register',requireAuth,cust_registerRoutes);

 app.use('/cust_details',requireAuth,cust_detailsController);

 app.use('/change_pass',requireAuth,change_passController)

 app.get('/logout',(req,res) =>{
    res.cookie('jwt','',{maxAge : 1})
    res.redirect('login');
 })
//Handle Error
app.use((req,res)=>{
     res.status(404).sendFile('./Views/error.html',{root:__dirname});
 })
