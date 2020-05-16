const jwt = require("jwt-simple");
const KEY="[@#%$^^^&*(*(@#$%]";
const fs = require("fs");
const path = require("path");
module.exports = {
    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    changeArr(arr,len=10){
        const arr2 = [];
        for(let i=0;i<arr.length;i+=len){
            arr2.push(arr.slice(i,i+len));
        }
        return arr2;
    },
    getNowTime(){
        var date = new Date();
        return date.getFullYear() + "-" +
            ((date.getMonth() + 1)).toString().padStart(2, 0) + "-" +
            (date.getDate()).toString().padStart(2, 0) + " " +
            (date.getHours()).toString().padStart(2, 0) + ":" +
            (date.getMinutes()).toString().padStart(2, 0) + ":" +
            (date.getSeconds()).toString().padStart(2, 0);
    },
    json(res,ok=-1,msg="网络连接错误"){
        res.json({
            ok,
            msg
        })
    },
    encode(payload){
        return jwt.encode({
            ...payload,
            ...{
                createTime:Date.now()
            }
        },KEY);
    },
    decode(token){
        try{
            const info=jwt.decode(token,KEY);
            const times=120*60*1000;
            if((Date.now()-info.createTime)>times){
                return {
                    ok:2,
                    msg:"token已过期"
                }
            }else{
                return {
                    ok:3,
                    msg:"token正常"
                }
            }
        }catch(e){
            return {
                ok:1,
                msg:"token解析失败"
            }
        }
    },
    async deletePic(picName){
        return new Promise((resolve,reject)=>{
            fs.unlink(path.resolve(__dirname,"../upload/"+picName),function (err) {
                if(err){
                    reject(1);// 1失败
                }else{
                    resolve(0);// 成功
                }
            })
        })
    }
}