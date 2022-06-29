module.exports = (app) => {
const router = require("express").Router();
const connections = require("../controllers/connections")

  router.get("/", connections.getAll );
  router.get("/:id", connections.getOne );
  router.post("/", connections.create );
  router.delete("/:id", connections.delete );
  router.put("/", connections.update );

  app.use("/api/connections", router);
};