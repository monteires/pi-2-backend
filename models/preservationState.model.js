module.exports = (conn, Sequelize) => {
    const PreservationState = conn.define('preservationState', {
        preservationState: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'estado_conservacao'
        }
    }, {
        tableName: 'estado_conservacao',
        timestamps: false
    })

    return PreservationState;
}