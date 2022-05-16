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
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING,
            field: 'telefone'
        },
        whatsappLink: {
            type: Sequelize.STRING,
            field: 'whatsapp_link'
        },
        hash: {
            type: Sequelize.STRING,
            field: 'hash_senha'
        }


    }, {
        tableName: 'usuario',
        timestamps: false
    })
    return User;
}