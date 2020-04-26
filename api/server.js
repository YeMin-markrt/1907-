const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const app = express();
app.use(bodyParser.json());


app.listen(8081,function () {
    console.log("success");
})