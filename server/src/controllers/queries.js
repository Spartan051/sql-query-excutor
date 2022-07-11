const Queries = require("../models/queries");

exports.getAll = (req, res) => {
  Queries.getAll(req.params.id, (err, response) => {
    if (err) {
      errorService(err, "get queries");
    } else {
      res.send({
        message: "queries has been send",
        data: response,
      });
    }
  });
};

exports.getOne = (req, res) => {
  Queries.getOne(req.params.id, (err, response) => {
    if (err) {
      errorService(err,"query", "get query");
    } else {
      res.send({
        message: "query has been send",
        data: response,
      });
    }
  });
};

exports.create = (req, res) => {
  Queries.create(req.body, (err, response) => {
    if (err) {
      errorService(err,"query", "create query");
    } else {
      res.send(response);
    }
  });
};

exports.delete = (req, res) => {
  Queries.delete(req.params.id, (err, response) => {
    if (err) {
      errorService(err,"query", "delete query");
    } else {
      res.send(response);
    }
  });
};

exports.update = (req, res) => {
  Queries.update(req.body, (err, response) => {
    if (err) {
      errorService(err,"query", "update query");
    } else {
      res.send(response);
    }
  });
};
