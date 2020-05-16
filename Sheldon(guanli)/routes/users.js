var express = require('express');
var router = express.Router();
var user  = require("../model/user/index");
const crypto = require('crypto');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("users/login");
});
router.post("/login",function(req,res,next){
  //
  var username = req.body.username;
  var userpwd = req.body.password;
  var newpwd = crypto.createHash("sha256").update(userpwd).digest("hex");
  // console.log("登录的用户名:"+username);
  //
  //user.login(username,userpwd).
  //根据用户名把用户名存在数据库中密码找出来
      //1用户名存在 才去比较
      //2用户名不存在 
  user.findUserInfoByName(username).then(function(obj){
    if(obj){
      if(obj.userpwd == newpwd){
        req.session.userid = obj["_id"];
        req.session.username = obj["username"];

        console.log("存储的用户编号为:"+req.session.userid);
        res.json({
          code:1,
          msg:"登录成功",
          type:obj.usertype
        })
      }else{
        res.json({
          code:0,
          msg:"用户名和密码不匹配"
        })
      }
    }else{
      res.json({
        code:0,
        msg:"该用户名不存在"
      })
    }
  },function(err){
    console.log(err);
    res.json({
      code:0,
      msg:"网络异常请稍后再试"
    })
  });





})

module.exports = router;
