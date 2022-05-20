const dbConfig = require('../config/db.config')
const Sequelize = require('sequelize')

const connection = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        operatorAliases: false,
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    })

const db = {
    Sequelize: Sequelize,
    sequelize: connection
}

db.preservationStates = require('./preservationState.model')(connection, Sequelize)
db.categories = require('./category.model')(connection, Sequelize)
db.products = require('./product.model')(connection, Sequelize)
db.users = require('./user.model')(connection, Sequelize)

db.users.hasMany(db.products, {
    foreignKey: 'fk_user',
    hooks: true,
    onDelete: 'CASCADE'
})

db.products.belongsTo(db.users)

db.products.hasOne(db.preservationStates, {
    sourceKey: 'preservationStateId',
    foreignKey: 'id'
})

db.products.hasOne(db.categories, {
    sourceKey: 'categoryId',
    foreignKey: 'id'
})

db.preservationStates.belongsTo(db.products, {
    targetKey: 'preservationStateId',
    foreignKey: 'id'
})

db.categories.belongsTo(db.products, {
    targetKey: 'categoryId',
    foreignKey: 'id'
})

module.exports = {
    db,
    connection
}


