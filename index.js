const express = require('express')
const app = express();
require('dotenv').config();
const port = process.env.PORT

//module import
const mongoose = require('mongoose')
const cors = require('cors');
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const passportConfig = require('./passport')


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));

app.use(session({
  secret: 'qweqweqwe',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({mongoUrl:process.env.MONGO_URI}),
  cookie: { 
    httpOnly: true,
    secure: false,
    maxAge: 1000*60*60*24
  },
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
  origin: process.env.FRONT_URL,
  credentials: true
}));
app.use(passport.initialize())
app.use(passport.session())
passportConfig();


//Router import
const userRouter = require('./routes/userRouter')
const authRouter = require('./routes/authRouter')

//Router use
app.use('/user', userRouter)
app.use('/auth', authRouter)


app.get('/', (req, res)=>{
  if(!req.user){
    res.json({"err": "login required"})
  }else{
    res.json(req.user)
  }
})


app.get('*', (req, res, next)=>{
    res.status(404).json({"err": 404})
})

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})