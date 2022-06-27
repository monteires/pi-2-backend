const express = require('express')
const loginController = require('../controller/login.controller')
const router = express.Router()

//   https://backend-univesp.herokuapp.com/login + req.body
router.post('/', loginController.login)

module.exports = router;