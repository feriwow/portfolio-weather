const express = require("express")
const router = express.Router()
const AiRouter = require("./chatGPT")
const Controller = require("../controller/controllerGPT")
const weatherRouter = require("./weather")
const userRouter = require("./user")

// router.post("/register", Controller.register)
// router.post("/login", Controller.login)
// router.post("/googleSignIn", Controller.loginGoogle)
router.use("/chatGPT", AiRouter)
router.use("/weather", weatherRouter)
router.use("/user", userRouter)


module.exports = router