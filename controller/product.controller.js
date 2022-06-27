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
        userId: req.id
    }).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message: `Internal server error: ${err}`
        })
    })

};

exports.update = (req, res) => {
    const id_do_item = req.params.id
    const id_criador_do_item = req.id;
    // console.log(`id_do_item: ${id_do_item} e d_criador_do_item: ${d_criador_do_item}`)

    Product.update(req.body, {
        where: {
            [Op.and]: [
                { id: id_do_item },
                { userId: id_criador_do_item }
            ]
        },
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product with id=${id}. Maybe way was not found or req.body was empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product with id=" + id
            });
        });
};

exports.delete = (req, res) => {
    const id_do_item = req.params.id
    const id_criador_do_item = req.id;
    Product.destroy({
        where: {
            [Op.and]: [
                { id: id_do_item },
                { userId: id_criador_do_item }
            ]
        }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete product with id=${id}. Maybe product was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete product with id=" + id
            });
        });
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

exports.findAllmy = (req, res) => {
    const offset = Number(req.params.offset)
    const limit = Number(req.params.limit)

    Product.findAll({
        offset: offset, // pula
        limit: limit, // lista essa quantidade
        where: {
            userId: req.id
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
