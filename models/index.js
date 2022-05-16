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

db.users = require('./user.model')(connection, Sequelize)
db.products = require('./product.model')(connection, Sequelize)
db.preservationStates = require('./preservationState.model')(connection, Sequelize)
db.categories = require('./category.model')(connection, Sequelize)

module.exports = db

