const express = require("express")
const WeatherController = require("../controller/controllerWeather")
const router = express.Router()

router.post("/", WeatherController.getWeather)
router.post("/geo", WeatherController.getLocation)
router.post("/current", WeatherController.currentWeather)

module.exports = router