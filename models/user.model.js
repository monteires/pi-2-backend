module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define('usuario', {
        nomeCompleto: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nomeSocial: {
            type: Sequelize.STRING
        },
        cpf: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        telefone: {
            type: Sequelize.STRING
        },
        whatsappLink: {
            type: Sequelize.STRING
        },
        hashSenha: {
            type: Sequelize.STRING
        }


    })
    return Usuario;
}