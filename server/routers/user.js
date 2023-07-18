const express = require("express")
const userController = require("../controller/controllerUser")
const authentication = require("../middleware/authentication")
// const { route } = require("./weather")
const router = express.Router()

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/googlelogin", userController.loginGoogle)
router.use(authentication)
router.post("/addBucket", userController.createBucket)
router.get("/Bucket", userController.getBucketbyId)
router.delete("/delete/:id", userController.deleteList)

module.exports = router
