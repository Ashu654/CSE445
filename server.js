require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300
var mongoose= require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)
const passport=require('passport')
const http=require('http').createServer(app)



//database connection
mongoose.connect('mongodb://localhost:27017/pizza');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
  console.log("Connection Successful!");
});


// storing Session 
let mongoStore = new MongoDbStore({
    mongooseConnection: db,
    collection: 'sessions'
})

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store:mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60*24} // 15 second
}))

//passport config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())
//assests
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//global middlewares
app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

 const server =app.listen(PORT , () => {
    console.log(`Listening on port ${PORT}`)
})

//chat app route
app.get('/chat',(req,res)=>{
    res.render('chat')
})


// Socket connection

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('Connected...')
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg)
    })

})