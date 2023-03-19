const httpStatus = require("http-status");
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
      const token = await authService.genAuthToken(user);

      res.cookie("x-access-token", token).status(httpStatus.CREATED).send({
        user,
        token,
      });
    } catch (error) {
      next(error);
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
