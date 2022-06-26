const express = require('express')
const uploadController = require('../controller/upload.controller')
const authenticateMiddleware = require('../middleware/authenticate.middleware')
const router = express.Router()

router.get('/', uploadController.upload)

module.exports = router;


