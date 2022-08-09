const Query = require("../models/query");
const errorService = require("../services/error.service");

exports.getAll = (req, res) => {
  Query.getAll(req, (err, response) => {
    if (err) {
      errorService(err, res, "get queries");
    } else {
      res.send({
        message: "success",
        data: response,
      });
    }
  });
};

exports.getOne = (req, res) => {
  Query.getOne(req, (err, response) => {
    if (err) {
      errorService(err, res, "query", "get query");
    } else {
      res.send({
        message: "success",
        data: response,
      });
    }
  });
};

exports.create = (req, res) => {
  Query.create(req, (err, response) => {
    if (err) {
      errorService(err, res, "query", "create query");
    } else {
      res.send(response);
    }
  });
};

exports.delete = (req, res) => {
  Query.delete(req, (err, response) => {
    if (err) {
      errorService(err, res, "query", "delete query");
    } else {
      res.send(response);
    }
  });
};

exports.update = (req, res) => {
  Query.update(req, (err, response) => {
    if (err) {
      errorService(err, res, "query", "update query");
    } else {
      res.send(response);
    }
  });
};
