const express = require("express");
const routes = require("./routes/index");
const cors = require("cors");
const morgan = require("morgan");
const { handleErrors } = require("./middlewares/errorsHandler");
const HandleDatabaseLogs = require("./middlewares/logsMiddleware");

const app = express();

// Middlewares
app.use(express.json());

app.use(morgan("dev"));

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Routes
app.use("/api", HandleDatabaseLogs, routes);

// Handle errors
app.use(handleErrors);

module.exports = app;
