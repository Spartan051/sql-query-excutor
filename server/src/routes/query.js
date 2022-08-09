module.exports = (app) => {
  const query = require("../controllers/query");
  const router = require("express").Router();

  router.get("/query", query.getAll);
  router.get("/query/:id", query.getOne);
  router.post("/query", query.create);
  router.delete("/query/:id", query.delete);
  router.put("/query", query.update);

  app.use("/api", router);
};
