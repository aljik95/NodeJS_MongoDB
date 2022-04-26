
const express = require('express');
const router = express.Router();
var cookieParser = require('cookie-parser')

const cust_listController = require('../controllers/cust_listController')


router.use(cookieParser())
//Customer list
router.get('/',cust_listController.cust_list_index);
//New Customer
router.get('/new_cust',cust_listController.cust_list_new);
//Customer Details
router.get('/:id',cust_listController.cust_list_id);

module.exports = router;