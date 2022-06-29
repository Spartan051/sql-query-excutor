module.exports = (app) => {
  const forms = require("../controllers/forms");
  const router = require("express").Router();

  router.get("/", forms.getall);
  router.post("/", forms.create);
  router.post("/execute", forms.execute);

  app.use("/api/forms", router);
};
