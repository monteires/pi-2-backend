const express = require('express')
const rateLimit = require('express-rate-limit')
const cors = require('cors')
//const xss = require('xss')
const hpp = require('hpp')
const errors = require('./utils/errors')
const errorHandler = require('./controller/error_handler')

const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const photoRoutes = require('./routes/photo.routes')
const loginRoutes = require('./routes/login.routes')

const path = require('path');


const session = require('express-session')
const SessionStore = require('express-session-sequelize')(session.Store)
const cookieParser = require('cookie-parser')
const secret = require('./config').envConfig.SESSION_SECRET

const dbConn = require('./models').connection

const sessionStore = new SessionStore({
    db: dbConn
})

const app = express();

// Enable CORS
// A habilitação do CORS é necessária para o nosso teste local pois tanto o frontend como o backend estarão rodando na mesma máquina,
// com o mesmo IP. Dessa forma, é necessário desabilitar essa segurança para testar a nossa aplicação.
// No ambiente produtivo, se as aplicações precisassem ficar na mesma máquina (incomum) seria adicionado
// o IP da máquina ao invés do * no header Access-Control-Allow-Origin.
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

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
app.use('/photo', photoRoutes);
app.use('/login', loginRoutes);


// Essa linha faz o servidor disponibilizar o acesso às imagens via URL!
app.use(express.static('/public'));
app.use(express.static('app'));

// Essa linha exibe a imagem
app.use('/public/uploads/:img', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/public/uploads', req.params.img));

})


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