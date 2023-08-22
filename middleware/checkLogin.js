
const checkLogin = {
    isLoggedIn : (req, res, next)=>{
        if(req.isAuthenticated()){
            next();
        } else {
            return res.json({"err": "login required"})
        }
    },
    isNotLoggedIn : (req, res, next)=>{
        if(!req.isAuthenticated()){
            next();
        } else {
            return res.json({"err": "already logged in"})
        }
    }
}


module.exports = checkLogin;