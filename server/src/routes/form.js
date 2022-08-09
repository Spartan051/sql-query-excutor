module.exports = (app) => {
  const form = require("../controllers/form");
  const router = require("express").Router();

  router.get("/", form.getall);
  router.post("/", form.create);
  router.post("/execute", form.execute);

  app.use("/api/form", router);
};
