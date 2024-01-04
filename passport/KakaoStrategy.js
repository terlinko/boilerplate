const passport = require('passport')
const KakaoStrategy = require('passport-kakao').Strategy
const User = require('../models/users')


module.exports = ()=>{
    passport.use(new KakaoStrategy({
        clientID:  process.env.KAKAO_ClientID,
        callbackURL: process.env.KAKAO_CallbackURL,
    }, (accessToken, refreshToken, profile, done)=>{
        User.findOne({ "sns.snsID": profile.id, "sns.provider": 'kakao' })
        .then(result=>{
            if(result){
                //있으면 로그인 성공
                console.log('로그인')
                done(null, result)
            } else {
                //없으면 회원가입
                console.log('회원가입 진행 후 로그인')
                const copiedJson = profile._json
                const new_user = new User({
                    email: profile._json.kakao_account.email,
                    nickname: profile.displayName,
                    sns: [{
                        snsID: profile.id,
                        provider: 'kakao'
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