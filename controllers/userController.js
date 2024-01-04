const User = require('../models/users')

const controller = {
    get : (req, res)=>{
        User.find({})
        .then(users=>{
            res.json(users);
        })
    },
    getByMySeq: (req, res)=>{
        //login required
        User.findOne({ seq: req.user.seq },{password: 0}).then((user)=>{
            res.json(user);
        })
    },
    isOkUsername: (req, res)=>{
        const username = req.query.username;
        //get 요청이라 req.body 가 아니라 req.query
        User.find({username: username})
        .then(result=>{
            if(result.length === 0){
                res.json({ok: true})
            }else{
                res.json({ok: false})
            }
        })
    }
}


module.exports = controller;