const passport = require('passport')
const LocalStrategy = require('./LocalStrategy')
const KakaoStrategy = require('./KakaoStrategy')
const GoogleStrategy = require('./GoogleStrategy')



module.exports = ()=>{
    
    passport.serializeUser((user, done)=>{
        process.nextTick(()=>{
            done(null, { username: user.username, objectID: user._id, seq: user.seq });
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