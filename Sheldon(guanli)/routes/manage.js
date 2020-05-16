var express = require('express');
var router = express.Router();
var user = require("../model/user")


const crypto = require('crypto');

var manage = require("../model/member")


router.get("/xiang",function(req, res, next){
    
    manage.list().then(function(result){
        console.log(result);
        res.render("manage/list1", {
            list: result
        
        });

    })
})
/* GET users listing. */
router.get('/', function (req, res, next) {
    var userid=req.session.userid;
    if(userid){
        // manage.listByUserId();
        // res.rander("manage/list");
        user.list().then(function (result) {
            // console.log(result);
            res.render("manage/list", {
                list: result
            
            });
        })
    }else{
        res.redirect("/users/");
    }

    

});



router.get("/del", function (req, res, next) {
    var id = req.query.id;
    user.delById(id).then(function (data) {
        if(data.deletedCount>0){
            res.json({
                code:1,
                msg:"删除成功"
            })
        }else{
            res.json({
                code:0,
                msg:"删除失败"
            })
        }
    })
})













router.post("/create", function (req, res, next) {
    var username = req.body.username;
    var userpwd = req.body.userpwd;
    var usertype = 2;
    var newpwd = crypto.createHash("sha256").update(userpwd).digest("hex");
    var userinfo = {
        username: username,
        userpwd: newpwd,
        usertype: usertype
    }
    // console.log(userinfo);

    user.findUserInfoByName(username).then(function (data) {
        if (data) {
            res.json({
                code: 0,
                msg: "该用户名已经存在"
            })
        } else {
            user.register(userinfo).then(function (data) {
                // console.log(data);
                // res.json({
                //     code:0,
                //     msg:"111"
                // })

                if (data.length) {
                    res.json({
                        code: 1,
                        msg: "新增成功"
                    })
                } else {
                    res.json({
                        code: 0,
                        msg: "新增失败 请稍后再试"
                    })
                }
            })
        }
    })

})


router.post("/create1", function (req, res, next) {
    var username = req.body.username1;
    var userpwd = req.body.userpwd1;
    var newpwd = crypto.createHash("sha256").update(userpwd).digest("hex");
    var usertype = 3;
    var userinfo = {
        username: username,
        userpwd: newpwd,
        usertype: usertype
    }
    console.log(userinfo);

    user.findUserInfoByName(username).then(function (data) {
        if (data) {
            res.json({
                code: 0,
                msg: "该用户名已经存在"
            })
        } else {
            user.register(userinfo).then(function (data) {
                // console.log(data);
                // res.json({
                //     code:0,
                //     msg:"111"
                // })

                if (data.length) {
                    res.json({
                        code: 1,
                        msg: "新增成功"
                    })
                } else {
                    res.json({
                        code: 0,
                        msg: "新增失败 请稍后再试"
                    })
                }
            })
        }
    })

})












module.exports = router;