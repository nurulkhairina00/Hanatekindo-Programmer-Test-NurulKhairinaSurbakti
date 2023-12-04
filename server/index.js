const express = require("express");
const cors = require("cors");
const pgp = require("pg-promise")();
const config = require("./database/config");
const jwt = require("jsonwebtoken");
const checkToken = require("./middleware/checkToken");

const db = pgp(config.db);
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require(`./api/signin`)(app, db, jwt);
app.use(checkToken);
require(`./api/user`)(app, db);

app.listen(5000, () => console.log("Server running at http://localhost:5000"));
