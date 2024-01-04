const User = require('../models/users')
const passport = require('passport')
const bcrypt = require('bcrypt')
const saltRound = Number(process.env.saltRound)


const controller = {
    getKakao : passport.authenticate('kakao'),
    getKakaoCallback : passport.authenticate('kakao', {
        failureRedirect: '/auth',
    }),
    getGoogle: passport.authenticate('google', {scope: ['profile', 'email']}),
    getGoogleCallback: passport.authenticate('google', {
        failureRedirect: '/auth',
    }),
    logout: (req, res)=>{
        req.logout((err)=>{
            if(err){
                return next(err);
            }
            res.redirect('/auth');
        })
    },
    login: passport.authenticate('local', {
        failureRedirect: '/auth',
        successRedirect: '/auth'
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
    },
    get: (req, res)=>{
        if(!req.user){
            res.json({msg: "로그인 상태가 아닙니다."})
        }else{
            if(!req.user.username){
                res.json({msg: "로컬 가입이 필요합니다."})
            }else{
                res.json(req.user)

            }
        }
    },
    addLocal: (req, res)=>{
        const currentUser = req.user;
        const busername = req.body.username;
        const password = req.body.password;
        User.findOne({seq: currentUser.seq}).then(user=>{
            bcrypt.hash(password, saltRound, (err, hashedPW)=>{
                if(err) console.error(err);
                User.findOneAndUpdate({seq: currentUser.seq},{username: busername, password: hashedPW},{new: true})
                .then(r=>{
                    res.json({msg: "로컬 가입 완료."})
                })
                .catch(err=>console.error(err))
            })
        })
        .catch(err=>console.error(err))
    }
}

module.exports = controller;