var mongoose = require("../db.js");
var schema = mongoose.Schema; //模型生成器(表生成器)
var userSchema = new schema({
    userid: String,
    username:String,
    bugName: String,
    bugContent:String,
    start:Date,
    end:Date,
    type:Number,      //1项目经理 
    developer:String,
    tester:String,
    typestate:Number,    //0 开发者未提交项目  1,开发者提交项目
    projectTitle:String,
    projectContent:String,
    dealType:Number,  //0待审核  1待修改/审核未通过  2已修改/待审核 3审核通过
});
//给结构取了一个名称
module.exports = mongoose.model("buginfo", userSchema);                               