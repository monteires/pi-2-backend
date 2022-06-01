const { categories, preservationStates } = require('../models');
const db = require('../models').db;
const Product = db.products
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    const {
        productName,
        description,
        uf,
        address,
        photo1,
        photo2,
        photo3,
        preservationStateId,
        categoryId,
        userId
    } = req.body;

    Product.create({
        productName,
        description,
        uf,
        address,
        photo1,
        photo2,
        photo3,
        preservationStateId,
        categoryId,
        userId
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: `Internal server error: ${err}`
        })
    })

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
        if (data) {
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

// nayton: implementando pesquisa por categoria
exports.findAllByCategory = (req, res) => {
    const category = req.params.category;

    Product.findAll({
        where: {
            categoryId: category
        }
    }).then(data => {
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

exports.update = (req, res) => {

};

exports.delete = (req, res) => {

};

exports.deleteAll = (req, res) => {

};

exports.findAllPublished = (req, res) => {

};