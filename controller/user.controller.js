const db = require('../models').db
const User = db.users
const Op = db.Sequelize.Op
// const session = require('../app').session
// const bcrypt = require('bcrypt')
const { products } = require('../models')

// var userSession;

const isValid = async (userData) => {
    const missingData = []
    if (!userData.name)
        missingData.push('name')
    if (!userData.email)
        missingData.push('email')
    if (!userData.password)
        missingData.push('password')

    return {
        valid: missingData.length == 0,
        missing: missingData
    }
}

// const findHashByEmail = (email) => {
//     return User.findOne({
//         attributes: ['email', 'hash'],
//         where: {
//             email: email
//         }
//     })
// }

// const comparePassword = async (password, hash) => {
//     return bcrypt.compare(password, hash)
// }

// exports.login = (req, res) => {
//     const { email, password } = req.body

//     if (!email || !password) {
//         res.status(400).send({
//             message: `Missing parameters`
//         })

//         return;
//     }

//     findHashByEmail(email).then(userCredentials => {
//         if (!userCredentials.email) {
//             res.status(404).send({
//                 message: `User not found: ${email}`
//             })

//             return;
//         }

//         comparePassword(password, userCredentials.hash).then(val => {
//             if (!val) {
//                 res.status(401).send({
//                     message: `Invalid credentials`
//                 })

//                 return;
//             }

//             //going to use lib "connect-session-sequelize" later
//             userSession = req.session

//             res.status(200).send({
//                 message: `Success! Welcome, ${email} | ` +
//                     `session info: ${JSON.stringify(userSession)}`
//             })
//         }).catch(err => {
//             res.status(500).send({
//                 message: `Internal server error: ${err}`
//             })
//         })

//     }).catch(err => {
//         res.status(500).send({
//             message: `Internal server error: ${err}`
//         })
//     })


// }

// exports.logout = (req, res) => {
//     //going to use lib "connect-session-sequelize" later
//     req.session.destroy()
// }

exports.create = (req, res) => {
    isValid(req.body).then(data => {
        if (!data.valid) {
            res.status(400).send({
                message: `Missing parameters=${data.missing.join(',')}`
            })
            return;
        }

        const { name, socialName, cpf, email, phone, password } = req.body
        const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}`

        User.create({
            name,
            socialName,
            cpf,
            email,
            phone,
            whatsappLink,
            password
        }).then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: `Could not create resource (user=${name},email=${email}): ${err.message}`
            })
        })

    }).catch(err => {
        res.status(500).send({
            message: `Could not parse user data: ${err.message}`
        })
    })


};

exports.getUserProducts = (req, res) => {
    const id = req.params.userId
    console.log(req.params)

    User.findByPk(id, {
        attributes: ['id'],
        include: [{ model: products }]
    })
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send(
                    {
                        message: `Resource not found (id=${id})`
                    }
                )
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message: `Internal server error: ${err}`
            })
        })

}

// somente para Desenvolvimento
exports.findAll = (req, res) => {
    User.findAll().then(data => {
        if (data) {
            res.send(data)
        } else {
            res.status(404).send({
                message: `Resource not found`
            })
        }
    }).catch(err => {
        res.status(500).send({
            message: `Internal server error: ${err}`
        })
    })
};

exports.findOne = (req, res) => {
    const id = req.params.id
    User.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(404).send(
                    {
                        message: `Resource not found (id=${id})`
                    }
                )
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send({
                message: `Internal server error: ${err}`
            })
        })

};

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};