const db = require('../models').db
const User = db.users
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')
const config = require('../config/index').envConfig


const findEmail = (email, password) => {
    return User.findOne({ where: { email: email } })
}


exports.login = (req, res) => {
    const { email, hash } = req.body

    if (!email || !hash) {
        res.status(400).send({
            message: `Missing parameters`
        })

        return;
    }


    findEmail(email, hash).then(userCredentials => {
        if (!userCredentials.email) {
            res.status(404).send({
                message: `User not found: ${email}`
            })
            return;

        } else if (userCredentials.hash == hash) {
            const user = userCredentials.email
            const token = jwt.sign({ user }, config.TOKEN_HASH, {
                expiresIn: config.TOKEN_EXPIRATION
            });
            res.status(200).send({
                logado: true,
                email: `${email}`,
                token: token
            })
            return;

        } else {
            res.status(404).send({
                message: `Senha inválida`
            })
        }


    }).catch(err => {
        res.status(500).send({
            message: `E-mail inválido`
        })
    })


}