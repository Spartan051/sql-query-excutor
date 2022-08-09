module.exports = (app) => {
  const router = require("express").Router();
  const connection = require("../controllers/connection");

  router.get("/connection", connection.getAll);
  router.get("/connection/:id", connection.getOne);
  router.post("/connection/", connection.create);
  router.delete("/connection/:id", connection.delete);
  router.put("/connection/", connection.update);

  app.use("/api", router);
};
