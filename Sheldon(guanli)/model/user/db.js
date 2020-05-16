var mongoose = require("mongoose");
var DB_URL = "mongodb://192.168.60.46:27017/sheldon";

mongoose.connect(DB_URL,{useNewUrlParser: true });
//状态的监听
mongoose.connection.on("connected",function () {
    console.log("连接成功");
});
mongoose.connection.on("error", function (err) {
    console.log(err);
});
mongoose.connection.on("disconnected", function () {
    console.log("连接断开");
});

module.exports = mongoose;
