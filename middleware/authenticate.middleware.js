
const jwt = require('jsonwebtoken');
const config = require('../config/index').envConfig


const blacklist = [];

exports.verifyJWT = (req, res, next) => {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });

    const index = blacklist.findIndex(item => item === token);
    if (index !== -1) return res.status(401).end();

    jwt.verify(token, config.TOKEN_HASH, function (err, decoded) {
        if (err) return res.status(401).json(
            {
                auth: false,
                message: 'Failed to authenticate token.'
            });

        // o que eu faço com isso abaixo ?
        req.email = decoded.user;
        next();
    });
}