module.exports = (sequelize, Sequelize) => {
    const Produto = sequelize.define('produto', {
        nomeProduto: {
            type: Sequelize.STRING,
            allowNull: false
        },
        descricao: {
            type: Sequelize.STRING
        },
        estadoBr: {
            type: Sequelize.STRING
        },
        endereco: {
            type: Sequelize.STRING
        },
        linkFoto1: {
            type: Sequelize.STRING
        },
        linkFoto2: {
            type: Sequelize.STRING
        },
        linkFoto3: {
            type: Sequelize.STRING
        }


    })
    return Produto;
}