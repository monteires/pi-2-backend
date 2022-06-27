const express = require('express')
const photoController = require('../controller/photo.controller')
const authenticateMiddleware = require('../middleware/authenticate.middleware')
const router = express.Router()

// https://backend-univesp.herokuapp.com/photo/{id da foto}/upload1
router.post('/:id/upload1', authenticateMiddleware.verifyJWT, photoController.upload1)

// https://backend-univesp.herokuapp.com/photo/{id da foto}/upload2
router.post('/:id/upload2', authenticateMiddleware.verifyJWT, photoController.upload2)

// https://backend-univesp.herokuapp.com/photo/{id da foto}/upload3
router.post('/:id/upload3', authenticateMiddleware.verifyJWT, photoController.upload3)

module.exports = router;


