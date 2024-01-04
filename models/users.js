const mongoose = require('mongoose')
const Counter = require('./counters')

const snsSchema = new mongoose.Schema({
    snsID: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        required: true
    }
}, {timestamps: true, versionKey: false})

const userSchema = mongoose.Schema({
    seq: {
        type: Number,
        default: 0
    },
    username: {
        type: String,
        unique: true
    },
    nickname:{
        type: String
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone: {
        type: String,
        // required: true
    },
    sns:[snsSchema]
}, {timestamps: true})

userSchema.pre('save', function(next){
    Counter.findOneAndUpdate({name: "user"}, {$inc: {nextSeq: 1}}, {new: true, upsert: true})
    .then(counter=>{
        this.seq = counter.nextSeq;
        next();
    })
    .catch(err=>console.log(err))
})


module.exports = mongoose.model('User', userSchema)