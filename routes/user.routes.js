const express = require("express");
const userController = require("../controller/user.controller");
const authenticateMiddleware = require("../middleware/authenticate.middleware");
const router = express.Router();

// Essa rota é apenas para o Desenvolvimento
// https://backend-univesp.herokuapp.com/users
router.get("/", userController.findAll);

// Essa rota é apenas para o Desenvolvimento
// https://backend-univesp.herokuapp.com/users/{id do usuário}
// https://backend-univesp.herokuapp.com/users/1
router.get("/:id", userController.findOne);

// criar usuário
// https://backend-univesp.herokuapp.com/users +req.boby
router.post("/", userController.create);

// update usuário
// https://backend-univesp.herokuapp.com/users +req.boby
<<<<<<< HEAD
router.put('/', userController.update)

// delete usuário
// https://backend-univesp.herokuapp.com/users
router.delete('/', userController.delete)
=======
router.put("/", userController.update);

// delete usuário
// https://backend-univesp.herokuapp.com/users
router.delete("/", userController.delete);
>>>>>>> cf2077f48bac5ec6e3bf7b43b5cd334133e347c1

module.exports = router;
