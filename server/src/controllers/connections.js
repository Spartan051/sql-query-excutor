const Connections = require("../models/connections");
const errorService = require("../services/error.service");

exports.getAll = (req, res) => {
  Connections.getAll(req.query.id, (err, response) => {
    if (err) {
      errorService(err , "get connections");
    } else {
      res.send({
        message: `connections has been send`,
        data: response,
      });
    }
  });
};

exports.getOne = (req, res) => {
  Connections.getOne(req.params.id, (err, response) => {
    if (err) {
      errorService(err ,"connection", "get connection");
    } else {
      res.send({
        message: `connection has been send`,
        data: response,
      });
    }
  });
};

exports.create = (req, res) => {
  Connections.create(req.body, (err, response) => {
    if (err) {
      errorService(err,"connection", "create connection");
    } else {
      res.send(response);
    }
  });
};

exports.delete = (req, res) => {
  Connections.delete(req.params.id, (err, response) => {
    if (err) {
      errorService(err,"connection", "delete connection");
    } else {
      res.send(response);
    }
  });
};

exports.update = (req, res) => {
  Connections.update(req.body, (err, response) => {
    if (err) {
      errorService(err,"connection", "update connection");
    } else {
      res.send(response);
    }
  });
};
