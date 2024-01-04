const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const checkLogin = require('../middleware/checkLogin')

router.get('/', userController.get)
router.get('/my', checkLogin.isLoggedIn, userController.getByMySeq)
router.get('/check', userController.isOkUsername)

module.exports = router;