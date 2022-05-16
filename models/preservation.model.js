module.exports = (sequelize, Sequelize) => {
    const EstadoConservacao = sequelize.define('estadoConservacao', {
        estadoConservacao: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    return EstadoConservacao;
}