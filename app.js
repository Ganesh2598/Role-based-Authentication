const express = require("express");
const app = express();
const signup = require("./Routes/register");
const login = require("./Routes/login")

app.use("/register",signup);
app.use("/login",login);

module.exports = app;