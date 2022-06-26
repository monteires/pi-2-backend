const express = require('express')
const logoutController = require('../controller/logout.controller')
const authenticateMiddleware = require('../middleware/authenticate.middleware')
const router = express.Router()

//precisa especificar o caminho base da rota no app.js

router.post('/', authenticateMiddleware.verifyJWT, logoutController.logout)


module.exports = router;