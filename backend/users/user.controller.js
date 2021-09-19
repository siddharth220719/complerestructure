const userService = require('./user.service');
const { successHandler, errorHandler } = require('../common/handlers');
const logger = require('../libs/logger')();
const { errorUtils } = require('../common/utils');
const { insertUserValidation, loginUserValidation } = require('./user.validation');
const jwt = require('../libs/jwt')();

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    await loginUserValidation.validateAsync({ email });

    const user = await userService.loginUser({ email, password });
    if (user.length === 0) {
      errorUtils.throwUnauthorized();
    }
    const token = await jwt.sign(user.id);

    return successHandler({ token }, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};

const insertUser = async (req, res, next) => {
  try {
    await insertUserValidation.validateAsync(req.body);
    const user = await userService.insertUser(req);
    return successHandler(user, req, res);
  } catch (err) {
    errorHandler(err, req, res);
    return next(err);
  }
};
module.exports = {
  loginUser, insertUser,
};
