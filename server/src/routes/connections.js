module.exports = (app) => {
  const router = require("express").Router();
  const connections = require("../controllers/connections");

  router.get("/connections", connections.getAll);
  router.get("/connection/:id", connections.getOne);
  router.post("/connection/", connections.create);
  router.delete("/connection/:id", connections.delete);
  router.put("/connection/", connections.update);

  app.use("/api", router);
};
