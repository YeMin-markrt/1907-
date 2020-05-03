const express = require("express");
const bodyParser = require("body-parser");
const db = require("./module/db");
const tools = require("./module/tools");
const app = express();
app.use(bodyParser.json());

app.get("/sentCode", async (req, res) => {
    const code = tools.getRandom(100000, 999999);
    res.json({
        ok: 1,
        code,
        msg: "验证码发送成功"
    })
})

app.post("/regist", async (req, res) => {
    const userTel = req.body.userTel;
    const userPwd = req.body.userPwd;
    const userInfo = await db.findOne("userList", { userTel });
    if (userInfo) {
        res.json({
            ok: -1,
            msg: "该用户名已存在"
        })
    } else {
        await db.insertOne("userList", {
            userTel,
            userPwd,
            sendTime: Date.now()
        });
        res.json({
            ok: 1,
            msg: "注册成功"
        })
    }
})

app.post("/login", async (req, res) => {
    const { userTel, userPwd } = req.body
    const userInfo = await db.findOne("userList", {
        userTel,
        userPwd
    })
    if (userInfo) {
        await db.updateOne("userList", { userTel }, { $set: { lastTime: Date.now() } })
        res.json({
            ok: 1,
            userInfo,
            msg: "登陆成功"
        })
    } else {
        tools.json(res, -1, "该用户不存在或密码错误")
    }
})

app.post("/upPwd", async (req, res) => {
    try {
        const userTel = req.body.userTel;
        const userPwd = req.body.userPwd;
        const userInfo = await db.findOne("userList", { userTel });
        if (userInfo) {
            await db.updateOne("userList", { userTel }, {
                $set: {
                    userPwd,
                    sendTime: Date.now()
                }
            });
            res.json({
                ok: 1,
                msg: "密码更新成功"
            })
        } else {
            tools.json(res, -1, "该用户不存在")
        }
    } catch (msg) {
        tools.json(res, -1, msg)
    }
})
// 加入购物车
app.get("/joinCar", async (req, res) => {
    const goodsAll = JSON.parse(req.query.goodsAll);
    const userName = req.query.userName;
    // console.log(goodsAll,userName,)
    const goodsInfo = await db.findOne("carList", {
        goodsId: goodsAll.defaultGoodsId,
        productId: goodsAll.id
    });
    // console.log(goodsInfo)
    // 曾经加入过购物车
    if (goodsInfo) {
        await db.updateOne("carList", {
            goodsId: goodsInfo.goodsId
        }, {
            $inc: {
                buyNum: 1
            }
        })
    } else {
        // 第一次加入购物车
        await db.insertOne("carList", {
            userName,
            name: goodsAll.name,
            goodsId: goodsAll.defaultGoodsId,
            productId: goodsAll.id,
            salesPrice: goodsAll.salesPrice.value,
            pic: goodsAll.pic,
            buyNum: 1,
            isChecked: true,
            addTime: Date.now()
        })
    }
    const carList = await db.find("carList", {
        whereObj: {
            userName
        },
        sort: {
            addTime: -1
        }
    })
    res.json({
        ok: 1,
        msg: "加入购物车成功",
        carList,
    })

<<<<<<< HEAD
//获得商品信息
app.get("/remList", async (req, res) => {
    const remList = await db.find("remList", {
        sort: {
            price: -1
        }
    })
    res.json({
        ok: 1,
        remList
    })
})
//根据商品id获取商品详情
app.get("/ProductInfo/:id", async (req, res) => {
    const id = req.params.id;
    const ProductInfo = await db.findOneById("remList", id);
    res.json({
        ok: 1,
        ProductInfo
    })
})

app.listen(8089,function () {
=======
})
//获取购物车数据
app.get('/getCar', async (req, res) => {
    const carInfo = await db.find("carList")
    res.json({
        ok: 1,
        carInfo
    })
})
// 更新购物车当中的选中状态
app.get("/changeIsChecked", async (req, res) => {
    // carId:购物车的ID, isChecked：要更改的值
    const { carId } = req.query;
    // console.log(carId,typeof isChecked);
    const carInfo = await db.findOneById("carList", carId);
    // console.log(carInfo)
    await db.updateOneById("carList", carId, {
        $set: {
            isChecked: !carInfo.isChecked//isChecked==="true"?true:false
        }
    })
    const carList = await db.find("carList", {
        whereObj: {
            userName: carInfo.userName
        },
    })
    res.json({
        ok: 1,
        carList
    })
})
//全选和反选
app.get("/changeAllIsChecked", async (req, res) => {
    const { userName, isChecked } = req.query;
    // console.log(userName, isChecked)
    await db.updateMany("carList", {
        userName
    }, {
        $set: {
            isChecked: isChecked === "true" ? true : false
        }
    })
    const carList = await db.find("carList", {
        whereObj: {
            userName
        },
    })
    res.json({
        ok: 1,
        carList
    })
})
app.listen(8089, function () {
>>>>>>> 03a1ed6889bc3408e1b41663dff84b5d73a5604a
    console.log("success");
})