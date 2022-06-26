const express = require('express')
const loginController = require('../controller/login.controller')
const router = express.Router()

//precisa especificar o caminho base da rota no app.js

router.post('/', loginController.login)


module.exports = router;