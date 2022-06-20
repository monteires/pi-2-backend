const express = require('express')
const userController = require('../controller/user.controller')
const router = express.Router()

//precisa especificar o caminho base da rota no app.js

router.get('/', userController.findAll)

router.get('/:id', userController.findOne)

router.get('/:userId/products/', userController.getUserProducts)

router.post('/', userController.create)

router.post('/login', userController.login)
// falta as rotas para
// atualizar senha     frontend  => /editar-senha
// atualizar email    frontend  =>  /editar-email

// atualizar perfil com (nome, sobrenome,Nome social, Telefone / WhatsApp)    frontend  =>  editar-perfil


module.exports = router;