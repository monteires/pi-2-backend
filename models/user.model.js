module.exports = (conn, Sequelize) => {
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
        }
    }, {
        tableName: 'usuario',
        timestamps: false
    })

    return User;
}