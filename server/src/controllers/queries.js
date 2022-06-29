const Queries = require("../models/queries");

exports.getAll = (req, res) => {
  Queries.getAll((err, response) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in get queries",
      });
    } else {
      res.send({
        message: `queries has been send`,
        data: response,
      });
    }
  });
};

exports.getOne = (req, res) => {
  Queries.getOne(req.params.id, (err, response) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in get query",
      });
    } else {
      res.send({
        message:`query has been send`,
        data: response,
      });
    }
  });
};

exports.create = (req, res) => {
  Queries.create(req.body , (err, response) => {
    if (err) {
      res.send({
        message: err.message || "some error in create query",
      });
    } else {
      res.send({message:"query is created"});
    }
  });
};

exports.delete = (req, res) => {
  Queries.delete(req.params.id, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in delete query",
      });
    } else {
      res.send({message: `query is deleted` });
    }
  });
};

exports.update = (req, res) => {
  Queries.update(req.body, (err) => {
    if (err) {
      res.status(500).send({
        message: err.message || "some error in update query",
      });
    } else {
      res.send({ message: `query is updated` });
    }
  });
};
