const { verivyToken } = require("../helper/token")
const {User} = require("../models/")

const authentication = async (req, res, next) => {
    try {
        const { access_token } = req.headers

        if (!access_token) {
            throw { name: "InvalidToken" }
        }

        const { id } = verivyToken(access_token)

        const user = await User.findByPk(id)

        if (!user) {
            throw { name: "InvalidToken" }
        }

        // console.log(user);
        req.user = user
        next()
    } catch (err) {
        // console.log(err);
        // res.json(err)
        next(err)
    }
}

module.exports = authentication