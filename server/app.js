require("dotenv").config();

const express = require("express");
const path = require("path");
const cors = require("cors");

const port = process.env.PORT;

const app = express();

// config JSON and form data response
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// solve cors
app.use(cors({ credentials: true, origin: "http://127.0.0.1:5173" }));

// upload directory
app.use("/src/uploads", express.static(path.join(__dirname, "/src/uploads")));

// DB connection
require("./src/config/db.js");

// routes
const router = require("./src/routes/Router.js");
app.use(router);

app.listen(port, () => {
  console.log(`Server rodando na porta ${port}`);
});
