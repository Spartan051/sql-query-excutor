const Connections = require("../models/connections");

exports.getAll = (req, res) => {
  Connections.getAll((err, response) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in get connections",
      });
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
      res.status(500).send({
        message: err.message || "some error in get one connection",
      });
    } else {
      res.send({
        message: `connection has been send`,
        data: response,
      });
    }
  });
};

exports.create = (req, res) => {
  Connections.create(req.body, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in create connection",
      });
    } else {
      res.send({
        message: `connection is created`,
      });
    }
  });
};

exports.delete = (req, res) => {
  Connections.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in delete connection",
      });
    } else {
      res.send({ message: `connection is deleted` });
    }
  });
};

exports.update = (req, res) => {
  Connections.update(req.body, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in update connection",
      });
    } else {
      res.send({ message: `connection is updated` });
    }
  });
};
