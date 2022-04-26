
const express = require('express');
const router = express.Router();

const cust_registerController = require('../controllers/cust_registerController')
 
router.post('/customer',cust_registerController.cust_register_index)

module.exports = router;