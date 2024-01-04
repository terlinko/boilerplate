const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const passport = require('passport')
const checkLogin = require('../middleware/checkLogin')

router.get('/', authController.get)

//SNS
router.get('/kakao',checkLogin.isNotLoggedIn, authController.getKakao)
router.get('/kakao/callback', authController.getKakaoCallback, (req, res)=>{res.redirect('/auth')})
router.get('/google', checkLogin.isNotLoggedIn, authController.getGoogle)
router.get('/google/callback', authController.getGoogleCallback, (req,res)=>{res.redirect('/auth')})
router.put('/local', checkLogin.isLoggedIn ,authController.addLocal)

//LOCAL
router.post('/join',checkLogin.isNotLoggedIn, authController.join)
router.post('/login',checkLogin.isNotLoggedIn, authController.login)

router.post('/logout',checkLogin.isLoggedIn, authController.logout)

module.exports = router;