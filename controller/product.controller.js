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
    const offset = Number(req.params.offset)
    const limit = Number(req.params.limit)

    Product.findAll({
        offset: offset, // pula
        limit: limit // lista essa quantidade
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

// corrigido, faltou o bd. antes do model: db.categories
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id, {
        include: [
            {
                model: db.categories
            },
            {
                model: db.preservationStates
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

// exibe todos itens de uma categotia ordenados pela data de criação e depois pelo id, caso haja datas de criação iguais
exports.findAllByCategory = (req, res) => {
    const category = req.params.category;
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);

    Product.findAll({
        offset: offset,
        limit: limit,
        where: {
            categoryId: category
        },
        order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
        ]
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


exports.findAllByText = (req, res) => {
    const query = `%${req.params.search}%`;
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);
    Product.findAll({
        offset: offset,
        limit: limit,
        where: {
            [Op.or]: [
                { productName: { [Op.like]: query } },
                { description: { [Op.like]: query } }
            ]
        },
        order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
        ]
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


// exibe todos itens de um estado do br ordenados pela data de criação e depois pelo id, caso haja datas de criação iguais
exports.findAllByUf = (req, res) => {
    const uf = req.params.uf;
    const offset = Number(req.params.offset);
    const limit = Number(req.params.limit);

    Product.findAll({
        offset: offset,
        limit: limit,
        where: {
            uf: uf
        },
        order: [
            ['createdAt', 'DESC'],
            ['id', 'DESC'],
        ]
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