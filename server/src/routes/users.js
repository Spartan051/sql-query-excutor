module.exports = (app) => {
  const users = require("../controllers/users");
  const router = require("express").Router();

  router.post("/register", users.create);
  router.post("/login", users.getOne);

  app.use("/api", router);
};
