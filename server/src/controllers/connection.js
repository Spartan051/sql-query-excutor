const Connection = require("../models/connection");
const errorService = require("../services/error.service");

exports.getAll = (req, res) => {
  Connection.getAll(req.headers.token, (err, response) => {
    if (err) {
      errorService(err, "get connections");
    } else {
      res.send({
        message: "success",
        data: response,
      });
    }
  });
};

exports.getOne = (req, res) => {
  Connection.getOne(req, (err, response) => {
    if (err) {
      errorService(err, "connection", "get connection");
    } else {
      res.send({
        message: "success",
        data: response,
      });
    }
  });
};

exports.create = (req, res) => {
  Connection.create(req, (err, response) => {
    if (err) {
      errorService(err, "connection", "create connection");
    } else {
      res.send(response);
    }
  });
};

exports.delete = (req, res) => {
  Connection.delete(req, (err, response) => {
    if (err) {
      errorService(err, "connection", "delete connection");
    } else {
      res.send(response);
    }
  });
};

exports.update = (req, res) => {
  Connection.update(req, (err, response) => {
    if (err) {
      errorService(err, res, "connection", "update connection");
    } else {
      res.send(response);
    }
  });
};
