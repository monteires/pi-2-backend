const jwt = require('jsonwebtoken');
const config = require('../config/index').envConfig;


exports.verifyJWT = (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });



    jwt.verify(token, config.TOKEN_HASH, function (err, decoded) {
        if (err) return res.status(401).json(
            {
                auth: false,
                message: 'Failed to authenticate token.'
            });

        // o id do user é enviado para o req, tbm está presente no token
        req.id = decoded.id;
        next();
    });
}