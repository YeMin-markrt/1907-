const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/dby");
const md5 = require("md5");
const tools = require("./module/tools");
const upPic=require("./module/upPic");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"))
const mongodb=require("mongodb");
const mongoClient=mongodb.MongoClient;

//登录
// -----------------------管理员接口--------------
app.post("/login",async (req,res)=>{
    try{
        //接收用户账号和密码用于登录
        const {adminName,passWord} = req.body;
        const info = await db.findOne("adminList",{
            adminName,
            passWord:md5(passWord+ "<*%$(@!~*&(**))>")
        })
        
        //在管理员对应的日志表中插入数据
        await db.insertOne("adminLog",{
            adminName,
            logType:(info?1:2),
            detail:"登陆信息："+(info?"成功":"失败"),
            addTime:Date.now()
        })
        // 更新管理员最后登陆的时间
        if(info){
            await db.updateOne("adminList",{_id:info._id},{$set:{loginTime:Date.now()}})
            setTimeout(()=>{
                res.json({
                    ok:1,
                    msg:"登陆成功",
                    token:tools.encode({adminName})
                })
            },1000)
        }else{
            setTimeout(()=>{
                tools.json(res,-1,"账号或密码错误");
            },1000)    
        }
    }catch(err){
        tools.json(res,-1,err)
    }
});

// 除了登陆以外，都会执行该路由。如果token没问题，继续向下匹配。
app.all('*',(req,res,next)=>{
    const token = req.headers.authorization;
    const {ok,msg,info}=tools.decode(token);
    if(ok===3){
        next()
    }else{
        tools.json(res,2,msg);
    }
})

//查找对应的一个数据
app.get("/findAdmin/:id",async(req,res)=>{
        const id = req.params.id;
        const info = await db.findOne("adminList",{
            _id:mongodb.ObjectId(id)
        })
       if(info){
        res.json({
            ok:1,
            msg:"查找成功",
            info
        })
       }else{
        tools.json(res,-1,"查找失败");
       }
})
//修改密码1
app.post('/upAdmin/:id',async(req,res)=>{
    const id = req.params.id;
    const {passWordnow} = req.body;
    try{
        await db.updateOne("adminList",{_id:mongodb.ObjectId(id)},{$set:{passWord:md5(passWordnow+ "<*%$(@!~*&(**))>")}})
        tools.json(res,1,"修改成功");
    }catch(e){
        tools.json(res,-1,"修改失败");
    }
})
//修改密码2
app.post("/upAdmin2",async(req,res)=>{
    const {adminpassword,passWordnow,adminName} = req.body;
    const info = await db.findOne("adminList",{
        adminName
    })
    if(info.passWord==md5(adminpassword+ "<*%$(@!~*&(**))>")){
        try{
            await db.updateOne("adminList",{adminName},{$set:{passWord:md5(passWordnow+ "<*%$(@!~*&(**))>")}})
            tools.json(res,1,"修改成功");
        }catch(e){
            tools.json(res,-1,"修改失败");
        }
    }else{
        tools.json(res,-1,"原密码错误");
    }
})
//获得管理员日志
app.get("/adminLog",async(req,res)=>{
    let pageIndex=req.query.pageIndex/1;
    const result=await db.page("adminLog",{
        sort:{
            addTime:-1,
        },
        pageIndex,
    })
    setTimeout(()=>{
        res.json(result)
    },1000)
})
// app.get("/adminLog",async(req,res)=>{
//     let pageIndex=req.query.pageIndex/1;
//     const limit=6;
//     let pageSum=1;
//     const count=await db.count("adminLog");
//     pageSum=Math.ceil(count/limit);
//     if(pageSum < 1){
//         pageSum = 1;
//     }
//     if(pageIndex <1){
//         pageIndex = 1;
//     }
//     if(pageIndex>pageSum){
//         pageIndex = pageSum;
//     }
//     const adminLog=await db.find('adminLog',{
//         limit,
//         skip:(pageIndex-1)*limit,
//         sort:{
//             addTime:-1
//         }
//     })
//     res.json({
//         ok:1,
//         adminLog,
//         pageIndex,
//         pageSum
//     })
// });
//获得管理员列表
app.get("/adminList",async(req,res)=>{
    let pageIndex=req.query.pageIndex/1;
    const result=await db.page("adminList",{
        sort:{
            addTime:-1,
        },
        pageIndex
    })
    setTimeout(()=>{
        res.json(result)
    },1000)
})
// app.get("/adminList",async(req,res)=>{
//     let pageIndex=req.query.pageIndex/1;
//     const limit=6;
//     let pageSum=1;
//     const count=await db.count("adminList");
//     pageSum=Math.ceil(count/limit);
//     if(pageSum < 1){
//         pageSum = 1;
//     }
//     if(pageIndex <1){
//         pageIndex = 1;
//     }
//     if(pageIndex>pageSum){
//         pageIndex = pageSum;
//     }
//     const adminList=await db.find('adminList',{
//         limit,
//         skip:(pageIndex-1)*limit,
//         sort:{
//             addTime:-1
//         }
//     })
//     res.json({
//         ok:1,
//         adminList,
//         pageIndex,
//         pageSum
//     })
// })

//根据id删除日志
app.delete("/adminLog/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        await db.deleteOneById("adminLog",id);
        tools.json(res,1,"删除成功")
    }catch(e){
        tools.json(res,-1,"删除成败")
    }
})

//根据id删除管理员列表
app.delete("/adminList/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        await db.deleteOneById("adminList",id);
        tools.json(res,1,"删除成功")
    }catch(e){
        tools.json(res,-1,"删除成败")
    }
})


// -----------------------店铺接口--------------
app.post("/shopTypeList",async (req,res)=>{
    upPic(req,"shopTypePic",async function ({ok,msg,params}) {
        if(ok === 1 ){
            await db.insertOne("shopTypeList",{
                shopTypeName:params.shopTypeName,
                shopTypePic:params.newPicName,
                addTime:Date.now()
            })
            tools.json(res,1,"上传成功");
        }else{
            tools.json(res,-1,msg);
        }
    })
})

app.get("/shopTypeList",async(req,res)=>{
    const pageIndex = req.query.pageIndex;
    const keyWords=req.query.keyWord||"";
    let whereObj = {};
    if(whereObj){
        whereObj={
            shopTypeName:new RegExp(keyWords)
        }
    }
    const response=await db.page("shopTypeList",{
        pageIndex,
        whereObj,
        limit:3,
        sort:{
            addTime:-1
        }
    })
    res.json(response);
})

app.delete("/delShopType/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        await db.deleteOneById("shopTypeList",id);
        tools.json(res,1,"删除成功")
    }catch(e){
        tools.json(res,-1,"删除成败")
    }
})

app.put("/shopTypeList",(req,res)=>{
    upPic(req,"shopTypePic",async function ({ok,msg,params}) {
        if(ok === 3){
            tools.json(res,-1,msg);
        }else{
            const upObj = {
                $set:{
                    shopTypeName:params.shopTypeName
                }
        }
        if(ok===1){
            const shopTypeInfo=await db.findOne("shopTypeList",{
                _id:mongodb.ObjectId(params.shopTypeId)
            })
            const result = await tools.deletePic(shopTypeInfo.shopTypePic);// 删除原图片
            upObj.$set.shopTypePic = params.newPicName; //添加上新修改的图片
        }
        await db.updateOneById("shopTypeList",params.shopTypeId,upObj);
        tools.json(res,1,"修改成功")
        }
    })
})
app.get("/allShopTypeList",async (req,res)=>{
    const shopTypeList = await db.find("shopTypeList",{
        sort:{
            addTime:-1
        }
    });
    res.json({
        ok:1,
        shopTypeList
    })
})

app.post("/shopLists",(req,res)=>{
    upPic(req,"shopPic",async function ({ok,msg,params}){
        if(ok === 1 ){
            const shopTypeInfo = await db.findOneById("shopTypeList",params.shopTypeId);
            await db.insertOne("shopList",{
                shopTypeId:shopTypeInfo._id,// 店铺类别集合当中的_id
                shopName:params.shopName,
                shopTypeName:shopTypeInfo.shopTypeName,
                shopPic:params.newPicName,
                addTime:Date.now()
            })
            tools.json(res,1,"上传成功");
        }else{
            tools.json(res,-1,msg);
        }
    })
})

app.get("/shopList",async (req,res)=>{
    const pageIndex = req.query.pageIndex;
    const keyWords=req.query.keyWord||"";
    let whereObj = {};
    if(whereObj){
        whereObj={
            shopName:new RegExp(keyWords),
        }
    }
    const response=await db.page("shopList",{
        pageIndex,
        whereObj,
        limit:3,
        sort:{
            addTime:-1
        }
    })
    res.json(response);
})

app.delete("/delShopList/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        await db.deleteOneById("shopList",id);
        tools.json(res,1,"删除成功")
    }catch(e){
        tools.json(res,-1,"删除成败")
    }
})

app.get("/shopInfo/:id",async (req,res)=>{
    const shopInfo = await db.findOneById("shopList",req.params.id);
    res.json({
        ok:1,
        shopInfo
    })
})

app.get("/shopTypeLists/:id",async (req,res)=>{
    const shopTypeInfo = await db.findOneById("shopTypeList",req.params.id);
    res.json({
        ok:1,
        shopTypeInfo
    })
})

app.put("/shopList",(req,res)=>{
    upPic(req,"shopPic",async function ({ok,msg,params}) {
        if(ok === 3){
            tools.json(res,-1,msg);
        }else{
            const upObj = {
                $set:{
                    shopName:params.shopName,
                    shopTypeName:params.shopTypeName
                }
        }
        if(ok===1){
            const shopTypeInfo=await db.findOne("shopList",{
                _id:mongodb.ObjectId(params.shopId)
            })
            const result = await tools.deletePic(shopTypeInfo.shopPic);// 删除原图片
            upObj.$set.shopPic = params.newPicName; //添加上新修改的图片
        }
        await db.updateOneById("shopList",params.shopId,upObj);
        tools.json(res,1,"修改成功")
        }
    })
})

app.get("/shopList/:shopTypeId",async (req,res)=>{
    const shopList = await db.find("shopList",{
        whereObj: {
            shopTypeId:mongodb.ObjectId(req.params.shopTypeId)
        }
    });
    res.json({
        ok:1,
        shopList
    })
})

//------------------------goods---------------
app.post("/goodsTypeList",async(req,res)=>{
    const shopInfo = await db.findOneById("shopList",req.body.shopId);
    await db.insertOne("goodsTypeList",{
        goodsTypeName:req.body.goodsTypeName,
        shopId:shopInfo._id,
        shopName:shopInfo.shopName,
        shopTypeId:shopInfo.shopTypeId,
        shopTypeName:shopInfo.shopTypeName,
        addTime:Date.now()
    })
    res.json({
        ok:1,
        msg:"插入成功"
    })
});

app.get("/goodsTypeList",async(req,res)=>{
    const pageIndex = req.query.pageIndex;
    const keyWords=req.query.keyWord||"";
    let whereObj = {};
    if(whereObj){
        whereObj={
            goodsTypeName:new RegExp(keyWords),
        }
    }
    const response=await db.page("goodsTypeList",{
        pageIndex,
        whereObj,
        limit:3,
        sort:{
            addTime:-1
        }
    })
    res.json(response);

})

app.post('/upgoodsTypeList',async(req,res)=>{
        const shopInfo = await db.findOneById("shopList",req.body.shopId);
        await db.updateOne("goodsTypeList",{_id:mongodb.ObjectId(req.body.id)},{$set:{
            goodsTypeName:req.body.goodsTypeName,
            shopId:shopInfo._id,
            shopName:shopInfo.shopName,
            shopTypeId:shopInfo.shopTypeId,
            shopTypeName:shopInfo.shopTypeName,
            addTime:Date.now()
        }})
        tools.json(res,1,"修改成功");
})

app.delete("/delgoodsTypeList/:id",async (req,res)=>{
    try{
        const id = req.params.id;
        await db.deleteOneById("goodsTypeList",id);
        tools.json(res,1,"删除成功")
    }catch(e){
        tools.json(res,-1,"删除成败")
    }
})

app.get("/goodstypeList/:shopId",async (req,res)=>{
    const goodstypeList = await db.find("goodsTypeList",{
        whereObj: {
            shopId:mongodb.ObjectId(req.params.shopId)
        }
    });
    res.json({
        ok:1,
        goodstypeList
    })
})

app.post("/goodsLists",(req,res)=>{
    upPic(req,"goodsPic",async function ({ok,msg,params}){
        if(ok === 1 ){
            const goodsTypeInfo = await db.findOneById("goodsTypeList",params.goodsTypeId);
            await db.insertOne("goodsList",{
                goodsTypeName:goodsTypeInfo.goodsTypeName,
                goodsNames:params.goodsNames,
                goodsTypeId:goodsTypeInfo._id,
                shopId:goodsTypeInfo.shopId,
                shopName:goodsTypeInfo.shopName,
                shopTypeId:goodsTypeInfo.shopTypeId,
                shopTypeName:goodsTypeInfo.shopTypeName,
                shopTypeId:goodsTypeInfo.shopTypeId,
                goodsPic:params.newPicName,
                addTime:Date.now()
            })
            tools.json(res,1,"上传成功");
        }else{
            tools.json(res,-1,msg);
        }
    })
})

app.get("/goodsList",async(req,res)=>{
    const pageIndex = req.query.pageIndex;
    const keyWords=req.query.keyWord||"";
    let whereObj = {};
    if(whereObj){
        whereObj={
            goodsNames:new RegExp(keyWords),
        }
    }
    const response=await db.page("goodsList",{
        pageIndex,
        whereObj,
        limit:3,
        sort:{
            addTime:-1
        }
    })
    res.json(response);
})

app.listen(8082,function () {
    console.log("success");
})
