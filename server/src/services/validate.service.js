const authService = require("./auth.service");

const Validate = (req) => {
  const token = req.headers.token;

  return authService().verify(token, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

module.exports = Validate;
