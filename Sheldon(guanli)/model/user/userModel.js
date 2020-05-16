var mongoose = require("../db.js");
var schema = mongoose.Schema; //模型生成器(表生成器)
var userSchema = new schema({
    username: String,
    userpwd: String,
    usertype:Number
});
//给结构取了一个名称
module.exports = mongoose.model("userinfo", userSchema);