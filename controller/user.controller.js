const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op

exports.create = (req, res) => {

};

exports.findAll = (req, res) => {
  
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
                message: 'Internal server error'
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