const authService = require("./auth.service");

const Validate = (req) => {
  const token = req.query.token || req.body.token;

  return authService().verify(token, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports = Validate;
