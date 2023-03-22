const httpStatus = require("http-status");
const { authService } = require("../services");
const sendEmail = require("../services/email.service");

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
      await sendEmail(email, user, token, "Register");

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
      const { email, password } = req.body;
      const user = await authService.signInWithEmailAndPassword(
        email,
        password
      );
      const token = await authService.genAuthToken(user);

      res.cookie("x-access-token", token).send({ user, token });
    } catch (error) {
      next(error);
    }
  },
  async isauth(req, res, next) {
    res.json(req.user);
  },
};

module.exports = authController;
