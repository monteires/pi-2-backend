const app = require('./app')
const config = require('./config').envConfig

const port = config.PORT

// really needed? {
// const db = require('./models')
// db.sequelize.sync()
// }

app.listen(port, () => {
    console.log(`http://localhost:${port}/`)
})