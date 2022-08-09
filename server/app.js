const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const Validate = require("./src/services/validate.service");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const fs = require("fs");
const swaggerConfig = require("./src/config/swagger");
const app = express();

// extra pakages
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cors());
app.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);
dotenv.config();

// swagger
const spec = swaggerJsDoc(swaggerConfig);
const customCss = fs.readFileSync(process.cwd() + "/swagger.css", "utf8");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec, { customCss }));

// routes
require("./src/routes/user")(app);

//auth
app.use((req, res, next) => {
  const verify = Validate(req);
  if (!verify) {
    res.status(501).send({
      message: "token invalid or expired",
    });
  } else {
    next();
  }
});

require("./src/routes/connection")(app);
require("./src/routes/query")(app);
require("./src/routes/form")(app);

// run server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listen to port ${port}`));
