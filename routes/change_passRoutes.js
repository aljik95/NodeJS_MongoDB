
const express = require('express');
const router = express.Router();


const change_passController = require('../controllers/change_passController')
//create-user
router.get('/',change_passController.change_pass_index)
 
router.post('/update_pass',change_passController.change_pass_account)

module.exports = router;