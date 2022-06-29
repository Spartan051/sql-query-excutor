const Forms = require("../models/forms");

exports.getall = (req, res) => {
  Forms.getall((err, response) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in get forms",
      });
    } else {
      res.send({ message: "forms has been send", data: response });
    }
  });
};

exports.create = (req, res) => {
  Forms.create(req.body, (err) => {
    if (err) {
      res.send({
        message: err.message || "some error in create form",
      });
    } else {
      res.send({ message: "form is created" });
    }
  });
};

exports.execute = (req, res) => {
  Forms.execute(req.body, (err, response) => {
    if (err) {
      res.send({
        message: err.message || "some error in execute query",
      });
    } else {
      res.send({ message: "query is executed", data: response });
    }
  });
};
