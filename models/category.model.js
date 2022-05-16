module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define('categoria', {
        categoria: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Categoria;
}