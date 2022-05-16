module.exports = (conn, Sequelize) => {
    const Categoria = conn.define('categoria', {
        categoria: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return Categoria;
}