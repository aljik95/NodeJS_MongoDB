
const express = require('express');
const router = express.Router();

const cust_detailsController = require('../controllers/cust_detailsController')
//Add Points
router.post('/addPoints',cust_detailsController.cust_addPoints)

//Generate QR Code
router.get('/gen_qr/:id',cust_detailsController.cust_genqr)

module.exports = router;