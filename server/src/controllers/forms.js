const Forms = require("../models/forms");
const errorService = require("../services/error.service")

exports.getall = (req, res) => {
  Forms.getall((err, response) => {
    if (err) {
      errorService(err, "get forms");
    } else {
      res.send({ message: "forms has been send", data: response });
    }
  });
};

exports.create = (req, res) => {
  Forms.create(req.body, (err) => {
    if (err) {
      errorService(err, "create form");
    } else {
      res.send({ message: "form is created" });
    }
  });
};

exports.execute = (req, res) => {
  Forms.execute(req.body, (err, response) => {
    if (err) {
      errorService(err, "execute query");
    } else {
      res.send({ message: "query is executed", data: response });
    }
  });
};
