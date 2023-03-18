const { authService } = require("../services");

const authController = {
  async register(req, res, next) {
    try {
      const { email, password, birthday, firstname, lastname, gender } =
        req.body;

      const user = await authService.createUser(
        email,
        password,
        firstname,
        lastname,
        birthday,
        gender
      );

      res.status(200).send({
        user,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async signin(req, res, next) {
    try {
    } catch (error) {}
  },
  async isauth(req, res, next) {
    try {
    } catch (error) {}
  },
};

module.exports = authController;
