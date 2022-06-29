const express = require("express");
const photoController = require("../controller/photo.controller");
const authenticateMiddleware = require("../middleware/authenticate.middleware");
const router = express.Router();

// https://backend-univesp.herokuapp.com/photo/{id do produto}/upload1  + req.body + token
// https://backend-univesp.herokuapp.com/photo/1/upload1
router.post("/:id/upload1", photoController.upload1);

// https://backend-univesp.herokuapp.com/photo/{id do produto}/upload2
// https://backend-univesp.herokuapp.com/photo/1/upload2  + req.body + token
router.post("/:id/upload2", photoController.upload2);

// https://backend-univesp.herokuapp.com/photo/{id do produto}/upload3  + req.body + token
// https://backend-univesp.herokuapp.com/photo/1/upload3
router.post("/:id/upload3", photoController.upload3);

module.exports = router;
