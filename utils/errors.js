module.exports = {
    error404: {
        statusCode: 404,
        message: 'Not found.',
        errorClass: 'client'
    },
    unkknowServerError: {
        statusCode: 500,
        message: 'Internal server error.',
        errorClass: 'server'
    }
}