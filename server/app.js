const express = require("express");
const { json , urlencoded } = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors")
const helmet = require("helmet");
const Validate = require("./src/services/validate.service");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require("swagger-jsdoc")
const fs = require('fs')
const swaggerConfig = require("./src/config/swagger")
const app = express();

// extra pakages
app.use(json());
app.use(urlencoded({extended:false}))
app.use(morgan("tiny"));
app.use(cors())
app.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));
dotenv.config();

// swagger
const spec = swaggerJsDoc(swaggerConfig)
const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(spec, {customCss}));

// routes
require("./src/routes/users")(app);

app.use((req, res, next) => {
  const verify = Validate(req)
  if (!verify) {
    res.status(501).send({
      message: "token invalid or expired",
    });
  }else{
   next() 
  }
});

require("./src/routes/connections")(app);
require("./src/routes/queries")(app);
require("./src/routes/forms")(app);

// run server
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listen to port ${port}`));
