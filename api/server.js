const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const app = express();
app.use(bodyParser.json());


app.get("/refist",async (req,res)=>{
    res.json({
        ok:1,
        msg:"测试"
    })
})

app.listen(8089,function () {
    console.log("success");
})