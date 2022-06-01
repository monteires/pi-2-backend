const express = require('express')
const productController = require('../controller/product.controller')
const router = express.Router()

router.get('/:id', productController.findOne)

router.post('/', productController.create)

router.get('/category/:category', productController.findAllByCategory)

module.exports = router