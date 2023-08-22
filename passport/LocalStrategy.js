const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/users')
const bcrypt = require('bcrypt')


module.exports = ()=>{
    passport.use(new LocalStrategy(
        function verify(username, password, done){ 
            User.findOne({username: username}).then((user)=>{
                if(!user) {
                    return done(null, false, {message: "user not found"})
                } 
                bcrypt.compare(password, user.password, (err,result)=>{
                    if(err) console.error(err);
                    if(result){
                        return done(null, user); //로그인 성공시
                    }else{
                        return done(null, false, {message: "user not found"}) //비밀번호 틀림
                    }
                })
            })
            .catch((err)=>{return done(err)})}
    ))
}