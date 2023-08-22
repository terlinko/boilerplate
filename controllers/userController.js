const User = require('../models/users')

const controller = {
    get : (req, res)=>{
        User.find({})
        .then(users=>{
            res.json(users);
        })
    }
}


module.exports = controller;