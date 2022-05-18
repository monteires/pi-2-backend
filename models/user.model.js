const bcrypt = require('bcrypt')

module.exports = (conn, Sequelize) => {
    const Product = require('./product.model')

    const User = conn.define('user', {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'nome_completo'
        },
        socialName: {
            type: Sequelize.STRING,
            field: 'nome_social'
        },
        cpf: {
            type: Sequelize.STRING(11)
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: Sequelize.STRING(12),
            field: 'telefone',
            unique: true
        },
        whatsappLink: {
            type: Sequelize.STRING,
            field: 'whatsapp_link'
        },
        hash: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'hash_senha'
        },
        password: {
            type: Sequelize.VIRTUAL,
            set: function(val) {
                hash = bcrypt.hashSync(val, 10)
                this.setDataValue('password', val)
                this.setDataValue('hash', hash)
            },
            validate: {
                isLongEnough: function(val) {
                    if(val.length < 6) {
                        throw new Error('Passwords should have 6 or more characters');
                    }
                }
            }
        }
    }, {
        tableName: 'usuario',
        timestamps: false
    })

    return User;
}