const express = require("express");
const { json } = require("body-parser");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors")
const app = express();
app.use(json());
dotenv.config();

app.use(morgan("tiny"));
app.use(cors())

require("./src/routes/connections")(app);
require("./src/routes/queries")(app);
require("./src/routes/forms")(app);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listen to port ${port}`));
