const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
//const xss = require('xss')
const hpp = require('hpp')
const errors = require('./utils/errors')
const errorHandler = require('./controller/error_handler')

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')

const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const cookieParser = require('cookie-parser')
const secret = require('./config').envConfig.SESSION_SECRET

const dbConn = require('./models').connection

const sessionStore = new SessionStore({
    db: dbConn
})

const app = express();

app.use(hpp())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: secret,
    saveUninitialized: false,
    store: sessionStore,
    resave: false
}))

//apparently no longer needed
//app.use(cookieParser())

//DDOS prevention
app.use('/', rateLimit({
    max: 200,
    windowsMs: 60 * 60 * 1000,
    message: 'Too many requests.'
}))

//Cross-site scripting prevention
//app.use(xss())

//Routes
app.use('/users', userRoutes)

app.use('/products', productRoutes)

//home for testing purposes
app.use('/', (req, res, next) => {
    res.status(200).json({
        message: 'Bem-vindo(a) ao início da aplicação.'
    })
})

app.use('*', (req, res, next) => {
    next(errors.error404, req, res, next)
})


app.use(errorHandler)

module.exports = {
    app,
    session
} 