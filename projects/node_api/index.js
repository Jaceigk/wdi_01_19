const express = require('express')
const http    = require('http')
const path    = require('path')
const logger  = require('morgan')
const session = require('express-session')
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser')
const isLoggedIn = require('./utils/isLoggedIn')

let app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))

app.use(logger('dev'))

// Built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser
app.use(express.json())
app.use(cookieParser('super-secret'))

let user = {}

app.use(session({
    secret: 'super-secret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: false,
        maxAge: 365 * 24 * 60 * 60 * 1000
    }
}))

app.get('/', function (req, res, next) {
    console.log(req.session)
    console.log(req.cookies)
    
    if (req.query) {
        next()

        return
    }

    res.send('Hey folks!')
})

app.get('/', function (req, res, next) {
    console.log(req.query)

    res.send(req.query)
})

app.get('/show-me-my-page', function(req, res, next) {
    if (req.session.user) {
        res.render('index', { user: req.session.user })
    } else {
        res.render('index', { user: null })
    }
})

app.get('/register', isLoggedIn, function (req, res, next) {
    res.render('register', { 'error_msg': false })
})

app.get('/user/register', function (req, res, next) {
    res.render('register')
})

app.get('*', function (req, res) {
    res.send('PAGE YOU ARE LOOKING FOR DOES NOT EXIST!')
})

let server = http.createServer(app)

server.listen(3000, function () {
    console.log('Server is running on port 3000')
})