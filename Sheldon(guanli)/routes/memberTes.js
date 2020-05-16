var express = require('express');
var router = express.Router();
var member=require('../model/member/index.js');
var user=require('../model/user/index.js');
const moment = require('moment');

//进去以后直接显示所有开发者信息列表
router.get('/', function(req, res, next) {
   var userid=req.session.userid;
 
  if(userid){

    user.hahaha().then(function(data){
     
      if(data.length){
        res.render('memberTes/list',{
         dd:{
          code:1,
          list:data,
          username:req.session.username,
          moment:moment
        }
        })
      }else{
        res.render('memberTes/list',{dd:{code:0,list:"该项目还没有开发者"}})
      }
    })
 }else{
  res.redirect('/users/')
 }
});



router.get('/baba', function(req, res, next) {
   user.hahaha().then(function(data){
     console.log(data)
     if(data.length){
      res.json({
        code:1,
        list:data
      })
     }else{
      res.json({
        code:0,
        list:"该项目还没有开发者"
      })
     }
   })
});








//点击某个按钮,查看所有已经由开发者提交的项目的信息
router.get("/hadPost",function(req,res,next){
  var userid=req.session.userid;
  if(userid){
      member.listTestByUserIdNeed().then(function(data){
        if(data.length){
          res.render('memberTes/list1',{
           dd:{
            code:1,
            list:data,
            username:req.session.username,
            moment:moment
          }
          })
        }else{
          res.render('memberTes/list',{dd:{code:0,list:"还没有开发者上传项目"}})
        }
      }) 
    }else{
      res.redirect('/users/')
  }
})


router.get("/haya",(req,res,next)=>{
  var id=req.query.id;
  var type=req.query.type;
  console.log(id,type)
  member.testupdate({_id:id},{dealType:type}).then(function(data){
    if(data.nModified){
      res.json({
        code:1,
        msg:"提交成功",
      })
    }else{
    res.json({
      code:0,
      msg:"数据库正在更新中!!"
    })
  
  }
})
}) 

router.post("/hahaha",(req,res,next)=>{
  var id=req.body.id;
  var tester=req.session.username;
  var bugName=req.body.bugName;
  var bugContent=req.body.bugContent;
  var developer=req.body.proName;
  var end=req.body.endTime;
console.log(id)
  var obj={
    tester,
    bugName,
    bugContent,
    developer,
    end,
    dealType:1
  }
  member.testupdate({_id:id},obj).then(function(data){
    if(data.nModified){
      res.json({
        code:1,
        msg:"提交成功",
      })
    }else{
    res.json({
      code:0,
      msg:"数据库正在更新中!!"
    })
    }
  
})
})




module.exports = router;
