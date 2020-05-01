const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const tools = require("./module/tools");
const app = express();
app.use(bodyParser.json());

app.get("/sentCode",async(req,res)=>{
    const code=tools.getRandom(100000,999999);
    res.json({
        ok:1,
        code,
        msg:"验证码发送成功"
    })
})

app.post("/regist",async(req,res)=>{
        const userTel=req.body.userTel;
        const userPwd=req.body.userPwd;
        const userInfo=await db.findOne("userList",{userTel});
        if(userInfo){
            res.json({
                ok:-1,
                msg:"该用户名已存在"
                })
        }else{
            await db.insertOne("userList",{
                userTel,
                userPwd,
                sendTime:Date.now()
            });
            res.json({
                ok:1,
                msg:"注册成功"
            })
        }
})

app.post("/login",async(req,res)=>{
    const {userTel,userPwd}=req.body
    const userInfo=await db.findOne("userList",{
        userTel,
        userPwd
    })
    if(userInfo){
        await db.updateOne("userList",{userTel},{$set:{lastTime:Date.now()}})
        res.json({
            ok:1,
            userInfo,
            msg:"登陆成功"
        })
    }else{
        tools.json(res,-1,"该用户不存在或密码错误")
    }
})

app.post("/upPwd",async(req,res)=>{
    try{
        const userTel=req.body.userTel;
        const userPwd=req.body.userPwd;
        const userInfo=await db.findOne("userList",{userTel});
        if(userInfo){
                await db.updateOne("userList",{userTel},{
                    $set:{
                        userPwd,
                        sendTime:Date.now()
                    }
                });
                res.json({
                    ok:1,
                    msg:"密码更新成功"
                })  
        }else{
            tools.json(res,-1,"该用户不存在")
        }
    }catch(msg){
        tools.json(res,-1,msg)
    }
})

app.listen(8089,function () {
    console.log("success");
})