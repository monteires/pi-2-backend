const app = require('./app')
const config = require('./config/index').envConfig

const port = config.PORT

app.listen(port, () => {
    console.log(`Started application on port ${port}`)
})