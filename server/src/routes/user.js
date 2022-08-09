module.exports = (app) => {
  const user = require("../controllers/user");
  const router = require("express").Router();

  router.post("/register", user.create);
  router.post("/login", user.getOne);

  app.use("/api", router);
};
