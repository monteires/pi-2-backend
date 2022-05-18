const { categories, preservationStates } = require('../models');
const db = require('../models');
const Product = db.products
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  
};

exports.findAll = (req, res) => {
  
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id, {
        include: [
            {
                model: categories
            },
            {
                model: preservationStates
            }
        ]
    }).then(data => {
        if(data) {
            res.send(data)
        } else {
            res.status(404).send({
                message: `Resource not found (id=${id})`
            })
        }
    }).catch(err => {
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