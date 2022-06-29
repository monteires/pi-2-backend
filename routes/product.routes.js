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
<<<<<<< HEAD
router.post('/', productController.create)
=======
router.post("/", productController.create);
>>>>>>> cf2077f48bac5ec6e3bf7b43b5cd334133e347c1

// update produto
// https://backend-univesp.herokuapp.com/products/{id do produto} + req.body + token
// https://backend-univesp.herokuapp.com/products/1
<<<<<<< HEAD
router.put('/:id', productController.update)
=======
router.put("/:id", productController.update);
>>>>>>> cf2077f48bac5ec6e3bf7b43b5cd334133e347c1

// deletar produto
// https://backend-univesp.herokuapp.com/products/{id do produto} + req.body + token
// https://backend-univesp.herokuapp.com/products/1
<<<<<<< HEAD
router.delete('/:id', productController.delete)
=======
router.delete("/:id", productController.delete);
>>>>>>> cf2077f48bac5ec6e3bf7b43b5cd334133e347c1

// offset é quantos itens serão pulados
// limit é quantos serão exibidos

// Essa rota é útil para exiir os 5 ultimos cadastrados, bem como para fazer a paginação.
// https://backend-univesp.herokuapp.com/products/{offset}/{limit}
// https://backend-univesp.herokuapp.com/products/0/50
router.get("/:offset/:limit", productController.findAll);

// pesquisa por categoria
// https://backend-univesp.herokuapp.com/products/category/{id da categoria}/{offset}/{limit}
// https://backend-univesp.herokuapp.com/products/category/2/0/5
router.get(
  "/category/:category/:offset/:limit",
  productController.findAllByCategory
);

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
<<<<<<< HEAD
router.get('/:offset/:limit/my', productController.findAllmy)
=======
router.get("/:offset/:limit/my", productController.findAllmy);
>>>>>>> cf2077f48bac5ec6e3bf7b43b5cd334133e347c1

module.exports = router;
