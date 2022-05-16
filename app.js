const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
//const xss = require('xss')
const hpp = require('hpp')
const errors = require('./utils/errors')
const errorHandler = require('./controller/error_handler')
const userRoutes = require('./routes/user.routes')

const app = express();

app.use(cors())

//DDOS prevention
app.use('/api', rateLimit({
    max: 200,
    windowsMs: 60 * 60 * 1000,
    message: 'Too many requests.'
}))

//Cross-site scripting prevention
//app.use(xss())

app.use(hpp())

//Routes
//home for testing purposes
app.use('/home', (req, res, next) => {
    res.status(200).json({
        message: 'Bem-vindo(a) ao início da aplicação.'
    })
})

app.use('/users', userRoutes)

//app.use('/product')

app.use('*', (req, res, next) => {
    next(errors.error404, req, res, next)
})


app.use(errorHandler)

module.exports = app