const express = require("express");
const app = express();
const router = require("./routers");
const dotenv = require("dotenv");
const path = require("path");
const errorHandler = require("./middleware/error");
const connectDatabse = require("./config/db");
const cors = require("cors");
const morgan = require("morgan");
app.use(cors());

dotenv.config();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

connectDatabse();

app.use(express.json());

app.use("/api", router);

app.use(errorHandler);
const { PORT } = process.env;

app.use("/public", express.static(path.join(__dirname + "/public")));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
