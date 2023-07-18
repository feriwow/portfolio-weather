const axios = require("axios")
const APIkey = process.env.APIkey


class WeatherController{
    static async getLocation(req, res){
        try {
            const {cityName} = req.body
            console.log(req.body);
        console.log(cityName ,"<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><<<<<<<<<<<<>>>>>>>>>>>");
        const {data} = await axios({
            url: `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${APIkey}`,
            method: "get",
        })
        console.log(data);
        res.status(200).json({lat: data[0].lat, lon: data[0].lon})
        } catch (err) {
            console.log(err);
        }
        
    }

    static async getWeather(req, res){
        const {lat, lon} = req.body
        console.log(req.body, "<<<<<<<<<<<<<<<<<<<<<<<");
        const {data} = await axios({
            url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=10&appid=${APIkey}`,
            method:"get"
        })
        console.log(data.list[0].weather[0].main, data.list[0].weather[0].description, data.list.length);
        res.status(200).json(data.list)
    }

    static async currentWeather(req, res){
        const {lat, lon} = req.body
        const {data} = await axios({
            url: `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIkey}`,
            method:"get"
        })
        console.log(data.weather[0].main, data.weather[0].description);
        res.status(200).json(data)
    }
}

module.exports = WeatherController