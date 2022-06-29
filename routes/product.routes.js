const express = require("express");
const productController = require("../controller/product.controller");
const authenticateMiddleware = require("../middleware/authenticate.middleware");
const router = express.Router();

// Exibe um determinado produto
// https://backend-univesp.herokuapp.com/{id do produto}/one
// https://backend-univesp.herokuapp.com/1/one
router.get("/:id/one", productController.findOne);

// criar produto
// https://backend-univesp.herokuapp.com/products + req.body + token

router.post('/', productController.create)

router.post("/", productController.create);


// update produto
// https://backend-univesp.herokuapp.com/products/{id do produto} + req.body + token
// https://backend-univesp.herokuapp.com/products/1

router.put('/:id', productController.update)

router.put("/:id", productController.update);


// deletar produto
// https://backend-univesp.herokuapp.com/products/{id do produto} + req.body + token
// https://backend-univesp.herokuapp.com/products/1

router.delete('/:id', productController.delete)

router.delete("/:id", productController.delete);


// offset é quantos itens serão pulados
// limit é quantos serão exibidos

// Essa rota é útil para exiir os 5 ultimos cadastrados, bem como para fazer a paginação.
// https://backend-univesp.herokuapp.com/products/{offset}/{limit}
// https://backend-univesp.herokuapp.com/products/0/50
router.get("/:offset/:limit", productController.findAll);

// pesquisa por categoria
// https://backend-univesp.herokuapp.com/products/category/{id da categoria}/{offset}/{limit}
// https://backend-univesp.herokuapp.com/products/category/2/0/5
router.get("/category/:category/:offset/:limit", productController.findAllByCategory);

// pesquisa por estado da confedereção
// https://backend-univesp.herokuapp.com/products/uf/{Sigla do Estado}/{offset}/{limit}
// https://backend-univesp.herokuapp.com/products/uf/sp/0/5
router.get("/uf/:uf/:offset/:limit", productController.findAllByUf);

// pesquisa por texto
// https://backend-univesp.herokuapp.com/products/search/{texto da pesquisa}/{offset}/{limit}
// https://backend-univesp.herokuapp.com/products/search/preta/0/5
router.get("/search/:search/:offset/:limit", productController.findAllByText);

// produtos de um determinado usuário logado
// https://backend-univesp.herokuapp.com/products/{offset}/{limit}/my
// https://backend-univesp.herokuapp.com/products/0/50/my

router.get('/:offset/:limit/:id', productController.findAllmy);


module.exports = router;
