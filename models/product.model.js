module.exports = (conn, Sequelize) => {
    const Category = require('./category.model')(conn, Sequelize)
    const PreservationState = require('./preservationState.model')(conn, Sequelize)

    const Product = conn.define('product', {
        productName: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'nome_produto'
        },
        description: {
            type: Sequelize.STRING,
            field: 'descricao'
        },
        uf: {
            type: Sequelize.STRING,
            field: 'estado_br'
        },
        address: {
            type: Sequelize.STRING,
            field: 'endereco'
        },
        photo1: {
            type: Sequelize.STRING,
            field: 'link_foto_1'
        },
        photo2: {
            type: Sequelize.STRING,
            field: 'link_foto_2'
        },
        photo3: {
            type: Sequelize.STRING,
            field: 'link_foto_3'
        },
        categoryId: {
            type: Sequelize.INTEGER,
            field: 'fk_categoria',
            references: {
                model: Category,
                key: 'id'
            }
        },
        preservationStateId: {
            type: Sequelize.INTEGER,
            field: 'fk_estado_conservacao',
            references: {
                model: PreservationState,
                key: 'id'
            }
        }

    }, {
        tableName: 'produto',
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: false
    })
    return Product;
}