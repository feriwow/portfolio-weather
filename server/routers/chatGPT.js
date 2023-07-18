const express = require("express");
const Controller = require("../controller/controllerGPT");
// const authorization = require("../middleware/authorization");
const router = express.Router()
router.post("/", Controller.chatResponse)

module.exports = router

