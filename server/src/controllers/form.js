const Forms = require("../models/form");
const errorService = require("../services/error.service");

exports.getall = (req, res) => {
  Forms.getall(req, (err, response) => {
    if (err) {
      errorService(err, "get forms");
    } else {
      res.send({ message: "success", data: response });
    }
  });
};

exports.create = (req, res) => {
  Forms.create(req, (err) => {
    if (err) {
      errorService(err, "create form");
    } else {
      res.send({ message: "success" });
    }
  });
};

exports.execute = (req, res) => {
  Forms.execute(req, (err, response) => {
    if (err) {
      errorService(err, "execute query");
    } else {
      res.send({ message: "success", data: response });
    }
  });
};
