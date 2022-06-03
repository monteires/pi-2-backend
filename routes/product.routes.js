const express = require('express')
const productController = require('../controller/product.controller')
const router = express.Router()

router.get('/:id', productController.findOne)

router.post('/', productController.create)


// offset é quantos itens serão pulados
// limit é quantos serão exibidos

// Essa rota é útil para exivir os 5 ultimos cadastrados, bem como para fazer a paginação.
router.get('/:offset/:limit', productController.findAll)

router.get('/category/:category/:offset/:limit', productController.findAllByCategory)

router.get('/uf/:uf/:offset/:limit', productController.findAllByUf)

// fazendo - falta colocar o OR para pesquisar na descrição também
router.get('/search/:search/:offset/:limit', productController.findAllByText)

module.exports = router