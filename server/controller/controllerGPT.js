const { Configuration, OpenAIApi } = require("openai");
const API_KEY = process.env.API_KEY 
const configuration = new Configuration({
  apiKey: API_KEY,
});
class Controller {
  static async chatResponse(req, res) {
    const {weatherCondition, cityName} = req.body
    console.log(req.body);
    const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `without \n\n, Recommend me one activity in ${weatherCondition} weather in ${cityName} no more than 25 words`,
      temperature: 0.7,
      max_tokens: 40
    });
    console.log(response.data.choices[0].text);
    res.status(200).json(response.data)
  }
}

module.exports = Controller
