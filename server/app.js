const express = require("express")
const Controller = require("./controller/controllerGPT")
const router = require("./routers")
// const errorHandler = require("./middleware/errorHandler")
const app = express()
const port = process.env.PORT || 3000
var cors = require('cors')
const errorHandler = require("./middleware/errorHandler")

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

app.use(errorHandler)

app.listen(port, () =>{
    console.log(`kamu ada di ${port}`);
})

module.exports = app