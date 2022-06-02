const express = require('express')
const productController = require('../controller/product.controller')
const router = express.Router()

router.get('/:id', productController.findOne)

router.post('/', productController.create)

router.get('/', productController.findAll)

// últimos 5 cadastrados  (essa não está funcionando)
router.get('/end/', productController.findEnd5)

router.get('/category/:category', productController.findAllByCategory)

router.get('/uf/:uf', productController.findAllByUf)

// fazendo - falta colocar o OR para pesquisar na descrição também
router.get('/search/:search', productController.findAllByText)

module.exports = router