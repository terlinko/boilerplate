const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    snsID: {
        type: String
    },
    provider: {
        type: String,
        required: true
    }
})



module.exports = mongoose.model('User', userSchema)