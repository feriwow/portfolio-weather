const { compare } = require("bcryptjs");
const { token } = require("../helper/token");
const { User, Bucket } = require("../models/");
const { OAuth2Client } = require("google-auth-library");

class userController {
  static async register(req, res, next) {
    try {
      const { email, password, userName } = req.body;
      const user = await User.create({
        userName,
        email,
        password,
      });
      // console.log(user);
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "EmailNull" };
      }
      // console.log(password);
      if (!password) {
        // console.log("test");
        throw { name: "PassNull" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "LoginFailed" };
      }

      const isValid = compare(password, user.password);

      if (!isValid) {
        throw { name: "LoginFailed" };
      }
      const accessToken = token({
        id: user.id,
        email: user.email,
      });
      res.json({ accessToken });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      // console.log(req.headers);
      const CLIENT_ID =
        "777605473653-u7q4qaulh9stqp1olngdnoc0dmov31oc.apps.googleusercontent.com";
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.google_token,
        audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      // console.log(payload);
      //find or create
      //acces token ==>
      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          userName: payload.name,
          password: "12345",
        },
        hooks: false,
      });
      const accessToken = token({
        id: user.id,
        email: user.email,
        username: user.userName,
      });

      res.json({ accessToken });

      // const userid = payload['sub'];
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async createBucket(req, res, next) {
    try {
      const { activity, time, place } = req.body;
      console.log(req.body);
      const bucket = await Bucket.create({
        activity,
        time,
        place,
        UserId: req.user.id,
      });
      res.status(201).json(bucket);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getBucketbyId(req, res, next) {
    try {
      const UserId = req.user.id;
      // console.log(UserId);
      const bucket = await Bucket.findAll({ where: { UserId: UserId } });

      if (!bucket) {
          throw { name: "NotFound" };
        }
      res.status(200).json(bucket);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async deleteList(req, res, next) {
    try {
      const { id } = req.params;
      // console.log(id);
      const bucket = await Bucket.findByPk(id);
      if (!bucket) {
        throw { name: "NotFound" };
      }
      await Bucket.destroy({ where: { id } });
      res.status(200).json({ message: `list with id ${id} has been deleted` });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = userController;
