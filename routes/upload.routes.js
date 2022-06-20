const express = require('express')
const uploadController = require('../controller/upload.controller')
const router = express.Router()

router.get('/', uploadController.upload)

module.exports = router;


