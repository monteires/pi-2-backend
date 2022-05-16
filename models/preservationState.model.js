module.exports = (conn, Sequelize) => {
    const EstadoConservacao = conn.define('estadoConservacao', {
        estadoConservacao: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return EstadoConservacao;
}