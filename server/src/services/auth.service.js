const jwt = require("jsonwebtoken");

const authService = () => {
  const issue = (payload) => jwt.sign(payload, "secret", { expiresIn: 10800 });
  const verify = (token, cb) => jwt.verify(token, "secret", {}, cb);

  return {
    issue,
    verify,
  };
};

module.exports = authService;
