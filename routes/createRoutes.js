
const express = require('express');
const router = express.Router();


const createController = require('../controllers/createController')
//create-user
router.get('/',createController.create_index)
 
router.post('/save_user',createController.create_account)

module.exports = router;