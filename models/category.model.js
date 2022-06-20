module.exports = (conn, Sequelize) => {
    const Category = conn.define('category', {
        category: {
            type: Sequelize.STRING,
            allowNull: false,
            field: 'categoria'
        }
    }, {
        tableName: 'categoria',
        timestamps: false
    })

    return Category;
}