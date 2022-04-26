
const express = require('express');
const router = express.Router();

const loginController = require('../controllers/loginController')


router.get('/',loginController.login_index)

router.post('/login_user', loginController.login_user)
 

module.exports = router;