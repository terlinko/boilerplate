const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = require('../models/users')


module.exports = ()=>{
    passport.use(new GoogleStrategy({
        clientID:  process.env.GOOGLE_ClientID,
        clientSecret: process.env.GOOGLE_ClientSecret,
        callbackURL: process.env.GOOGLE_CallbackURL,
    }, (accessToken, refreshToken, profile, done)=>{
        console.log(profile)
        User.findOne({ "sns.snsID": profile.id, "sns.provider": 'google' })
        .then(result=>{
            if(result){
                //있으면 로그인 성공
                console.log('로그인')
                done(null, result)
            } else {
                //없으면 회원가입
                console.log('회원가입 진행 후 로그인')
                const new_user = new User({
                    email: profile._json.email,
                    nickname: profile.displayName,
                    sns: [{
                        snsID: profile.id,
                        provider: 'google'
                    }]
                })
                new_user.save()
                .then(result=>{
                    done(null, result)
                })
            }
        })
        .catch(err=>{
            console.log(err)
            done(err)
        })
    }
    ))
}