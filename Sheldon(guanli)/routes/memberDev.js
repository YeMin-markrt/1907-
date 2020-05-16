var express = require('express');
var router = express.Router();
var  member = require("../model/member");
const moment = require('moment')

/* GET home page. */
// router.get('/', function(req, res, next) {
//     var userid=req.session.userid;
//     var username=req.session.username;
//     obj={
//         username:username
//     }
//     console.log(obj)
//     if(userid){
//       member.listDeveByUserId(obj).then(function(data){
          
//           console.log(data)
//           res.render("memberDev/list",{
//                 list:data,
//                 userid:req.session.userid,
//                 username:req.session.username,
//                 moment: moment
//             });
//             console.log
//         })
     
//     }
//     else{
//         res.redirect("/users/");
//     } 
// });

/* GET home page. */
router.get('/', function(req, res, next) {
    var userid=req.session.userid;
    var username=req.session.username;
    obj={
        username:username
    }
    console.log(obj)
    if(userid){
      member.listDeveByUserId1().then(function(data){
          console.log(data)
          var list1=[];
          data.forEach( item => {

            if(item.username==item.developer){
              if(item.username==username){
                list1.push(item)
              }
            }else{
              if(item.username==username){
                list1.push(item)
              }
              if(item.developer==username){
                 list1.push(item)
               }
            }
           
         });
        
          res.render("memberDev/list",{
                list:list1,
                userid:req.session.userid,
                username:req.session.username,
                moment: moment
            });
            console.log
        })
     
    }
    else{
        res.redirect("/users/");
    } 
});



router.post("/create",function(req,res,next){
  var projectTitle = req.body.projectTitle;
  var projectContent = req.body.projectContent;
  var start = new Date();

  var  dealType = 0; //1表示提交  2:同意  3:拒绝
  var obj = {
      userid:req.session.userid,
      username:req.session.username,
    //   username:"bbb",
      projectTitle:projectTitle,
      projectContent:projectContent,
      start:start,
      dealType:dealType,
      bugName:"",
      bugContent:"",
      end:"",
      tester:"等待审核中",
      typestate:1,
      developer:req.session.username,
      type:2
  }
  member.devCreate(obj).then(function(data){
    //   console.log(data);
     if(data.length>0){
      res.json({
          code:1,
          msg:"成功"
      })
     }else{
         res.json({
             code:0,
             msg:"失败"
         })
     } 
  })
})

router.get("/updateDealtypeById",(req,res,next)=>{

  var  id = req.query.id;
  var dealType = req.query.dealType;


  member.update({_id:id},{dealType:dealType}).then(function(data){

     if(data.nModified){
      res.json({
          code:1,
          msg:"成功"
      })
     }else{
      res.json({
          code:0,
          msg:"失败"
      })
     }
  })

})

module.exports = router;
