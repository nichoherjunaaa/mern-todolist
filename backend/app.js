const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT;
const DatabaseConnection = require('./config/DatabaseConnection')
const router = require('./router/todoRouter')

const app = express()
app.use(express.json())
app.use(cors())

DatabaseConnection()

app.use('/todos', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})

