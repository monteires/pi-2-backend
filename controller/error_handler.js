const defaultError = require('../utils/errors').unkknowServerError

module.exports = (err, req, res, next) => {
    const statusCode = err.statusCode || defaultError.statusCode

    res.status(statusCode).json({
        message: err.message || defaultError.message,
        errorClass: err.errorClass || defaultError.errorClass
    })
}