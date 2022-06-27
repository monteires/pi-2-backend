const express = require('express')
const productController = require('../controller/product.controller')
const authenticateMiddleware = require('../middleware/authenticate.middleware')
const router = express.Router()

// usada para exibir as informações sobre determinado produto frontend =>  /info-produto
router.get('/:id', productController.findOne)

// criar produto
router.post('/', authenticateMiddleware.verifyJWT, productController.create)

// update produto
router.put('/:id', authenticateMiddleware.verifyJWT, productController.update)

// deletar produto
router.delete('/:id', authenticateMiddleware.verifyJWT, productController.delete)

// offset é quantos itens serão pulados
// limit é quantos serão exibidos

// Essa rota é útil para exivir os 5 ultimos cadastrados, bem como para fazer a paginação.
// router.get('/:offset/:limit', productController.findAll)

router.get('/:offset/:limit', authenticateMiddleware.verifyJWT, productController.findAll)

router.get('/category/:category/:offset/:limit', productController.findAllByCategory)

router.get('/uf/:uf/:offset/:limit', productController.findAllByUf)

router.get('/search/:search/:offset/:limit', productController.findAllByText)

// falta as rotas de:
// exibir protutos cadastrados por detarminada pessoa  frontend  => minhas-doacoes

// update produto       frontend  =>  /editar-doacao         editar-email

module.exports = router