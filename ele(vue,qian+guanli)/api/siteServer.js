const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/dby");
const tools = require("./module/tools");
const mongodb = require("mongodb");
const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname+"/upload"))
// 发送验证码
app.post("/sendCode",async (req,res)=>{
    /*思路：
    * 1、接收数据（phoneCode）
    * 2、验证该手机号是否在指定的时间内发送过验证码  阿里大鱼
    *   1、发送过
    *       提示，请不要频繁发送验证码，请在XXX秒以后再次发送。
    *   2、未发送。
    *       发送。
    * */
    try{
        const phoneCode = req.body.phoneCode;
        const codeInfo = await db.findOne("userCodeList",{
            phoneCode
        });
        // 判断是否有值
        if(codeInfo){
            // 判断验证码是否过期.  time  当前时间减去发送时间
            const time = Date.now()-codeInfo.sendTime;
            if(time > 60*1000 ){
                // 过期 ，重新发送
                const code = tools.getRandom(100000,999999);
                // 更新，发送的验证码，以及发送时间
                await db.updateOne("userCodeList",{phoneCode},{
                    $set:{
                        code,
                        sendTime:Date.now()
                    }
                });
                res.json({
                    ok:1,
                    code,
                    msg:"发送验证码成功"
                })
            }else{
                // 提示，发送不要太频繁
                tools.json(res,-1,"请不要发送太频繁。请在"+(60-Number.parseInt(time/1000))+"秒以后再次发送")
            }
        }else{
            // 发送验证码
            const code = tools.getRandom(100000,999999);
            await db.insertOne("userCodeList",{
                code,
                phoneCode,
                sendTime:Date.now()
            });
            res.json({
                ok:1,
                code,
                msg:"发送验证码成功"
            })
        }

    }catch (msg) {
        res.json({
            ok:-1,
            msg
        })
    }



})

// 登陆
app.post("/login",async (req,res)=>{
   /*
   * 1、接收参数。手机号验证码
   * 2、去userCodeList短信集合当中查找是否有匹配的
   *    1、有匹配
   *        1、验证验证码是否过期。
   *            1、过期：提示验证码失败
   *            2、不过期：
   *                1、用户集合当中查找该用户是否登陆过。
   *                    1、未登陆过，增加一条用户信息
   *                    2、登陆过，更新一下用户信息。
   *    2、无匹配，直接返回验证码错误*/
   const {phoneCode,code} = req.body;
   //去userCodeList短信集合当中查找是否有匹配的
   const codeInfo = await db.findOne("userCodeList",{
       phoneCode,
       code:code/1
   })
    // 有匹配
    if(codeInfo){
        // 过期：提示验证码失败
        if((Date.now()-codeInfo.sendTime)>300*1000){
            tools.json(res,-1,"验证码失效了");
        }else{
            // 不过期
            const userInfo = await db.findOne("userList",{
                phoneCode
            });
            if(userInfo){
                // 如果用户存在，更新用户最后登陆的时间。
                await db.updateOne("userList",{
                    phoneCode
                },{
                    $set:{
                        lastTime:Date.now()
                    }
                })
            }else{
                await db.insertOne("userList",{
                    phoneCode,
                    regTime:Date.now(),
                    lastTime:Date.now()
                })
            }
            res.json({
                ok:1,
                token:tools.encode({
                    phoneCode
                }),
                msg:"登陆成功"
            })
        }
    }else{
        // 无匹配，直接返回验证码错误*/
        tools(res,-1,"验证码错误")
    }


})
// 根据店铺的关键字搜索相关店铺信息
app.get("/search",async(req,res)=>{
    const keyword = req.query.keyword;
    if(keyword.length>0){
        const shopList = await db.find("shopList",{
            whereObj:{
                shopName:new RegExp(keyword)
            }
        })
        res.json({
            ok:1,
            shopList
        })
    }else{
        res.json({
            ok:1,
            shopList:[]
        })
    }

})



//  根据店铺ID获得店铺详情
app.get("/shopInfo/:shopId",async (req,res)=>{
    const shopId = req.params.shopId;
    const shopInfo = await db.findOneById("shopList",shopId);
    res.json({
        ok:1,
        shopInfo
    })
})

app.get("/shopTypeList",async(req,res)=>{
    const shopTypeList =await db.find("shopTypeList",{
        sort:{
            addTime:-1
        },
        limit:30
    })
    res.json({
        ok:1,
        shopTypeList:tools.changeArr(shopTypeList,10)
    })
})

app.get("/shopList",async(req,res)=>{
    const shopList =await db.find("shopList",{
        sort:{
            addTime:-1
        },
        limit:30
    })
    res.json({
        ok:1,
        shopList:shopList
    })
})

// 根据店铺类别ID获得店铺
app.get("/shopList/:shopTypeId",async (req,res)=>{
    const shopTypeId = req.params.shopTypeId;
    const shopList = await db.find("shopList",{
        whereObj:{
            shopTypeId:mongodb.ObjectId(shopTypeId)
        }
    });
    res.json({
        ok:1,
        shopList
    })
})
// 根据店铺ID获得商品类别
app.get("/goodsTypeList/:shopId",async(req,res)=>{
    const shopId = req.params.shopId;
    const goodsTypeList = await db.find("goodsTypeList",{
        whereObj: {
            shopId:mongodb.ObjectId(shopId)
        }
    })
    res.json({
        ok:1,
        goodsTypeList
    })
})
app.listen(8090,function () {
    console.log("success");
})