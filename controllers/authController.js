const User = require('../models/users')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRound = Number(process.env.saltRound)


const controller = {
    getKakao : passport.authenticate('kakao'),
    getKakaoCallback : passport.authenticate('kakao', {
        failureRedirect: '/',
    }),
    getGoogle: passport.authenticate('google', {scope: ['profile', 'email']}),
    getGoogleCallback: passport.authenticate('google', {
        failureRedirect: '/',
    }),
    logout: (req, res)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            res.redirect('/');
        })
    },
    login: passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/'
    }),
    join: (req, res)=>{
        const copiedUser = req.body;
        bcrypt.hash(copiedUser.password, saltRound, (err, hashedPW)=>{
            if(err) console.error(err);
            copiedUser.password = hashedPW;
            const new_user = new User(copiedUser);
            new_user.save().then((result)=>{
                res.json(result)
            })
            .catch(err=>res.status(500).json(err))
        })
    }
}

module.exports = controller;