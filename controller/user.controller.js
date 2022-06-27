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

// exports.update = (req, res) => {
//     const { name, socialName, phone } = req.body
//     const whatsappLink = `https://api.whatsapp.com/send?phone=${phone}`
//     const id = req.id
//     update(
//         {
//             name: name,
//             socialName: socialName,
//             phone: phone,
//             whatsappLink: whatsappLink
//         },
//         { where: { id: id } }).then(data => {
//             res.send(data)
//         }).catch(err => {
//             res.status(500).send({
//                 message: `Could not update resource: ${err.message}`
//             })
//         })
// };
exports.update = (req, res) => {
    const id = req.id;
    User.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "User was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update user with id=${id}. Maybe way was not found or req.body was empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating user with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id = req.id;
    User.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "user was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete user with id=${id}. Maybe user was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete user with id=" + id
            });
        });
};

exports.getUserProducts = (req, res) => {
    const id = req.params.userId
    // console.log(req.params)

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



exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};