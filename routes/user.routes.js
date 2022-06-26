const express = require('express')
const userController = require('../controller/user.controller')
// const loginController = require('../controller/login.controller')
const router = express.Router()

//precisa especificar o caminho base da rota no app.js

router.get('/', userController.findAll)

router.get('/:id', userController.findOne)

router.get('/:userId/products/', userController.getUserProducts)


// criar usuário
router.post('/', userController.create)

// router.post('/login', loginController.login)
// falta as rotas para
// atualizar senha     frontend  => /editar-senha
// atualizar email    frontend  =>  /editar-email

// atualizar perfil com (nome, sobrenome,Nome social, Telefone / WhatsApp)    frontend  =>  editar-perfil


module.exports = router;