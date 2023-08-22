const passport = require('passport')
const LocalStrategy = require('./LocalStrategy')
const KakaoStrategy = require('./KakaoStrategy')
const GoogleStrategy = require('./GoogleStrategy')



module.exports = ()=>{
    
    passport.serializeUser((user, done)=>{
        process.nextTick(()=>{
            done(null, { nickname: user.nickname, objectID: user._id });
        })
    })
    
    passport.deserializeUser((user, done)=>{
        process.nextTick(()=>{
            return done(null, user);
        })
    })

    //Strategies
    LocalStrategy();
    KakaoStrategy();
    GoogleStrategy();
}