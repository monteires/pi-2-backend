const express = require('express')
const userController = require('../controller/user.controller')
const router = express.Router()

router.get('/', userController.findAll)

router.get('/:id', userController.findOne)

router.post('/', userController.create)

router.post('/login', userController.login)

module.exports = router;