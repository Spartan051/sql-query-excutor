const User = require("../models/user");


exports.getOne = (req, res) => {

  User.getOne(req.body, (err, response) => {
      if (err) {
        res.send({
          message: err.message || "some error in get user info",
        });
      } else {
        res.send(response);
      }
    });
  };

  exports.create = (req, res) => {

    User.create(req.body, (err,response) => {
      if (err) {
        res.status(500).send({
          message: err.message || "some error in create user",
        });
      } else {
        res.send(response);
      }
    });
  };
  