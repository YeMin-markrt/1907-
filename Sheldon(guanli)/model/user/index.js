var  userinfo  = require("./userModel");

let  user = {
    findUserInfoByName:function(username){
        return  new Promise(function(resolve,reject){
            userinfo.findOne({username:username},(err,obj)=>{
                if(!err){
                    // console.log(list);
                    resolve(obj);
                }else{
                    reject(err);
                }
            })
        })
    },
    register:function(obj){
      return  userinfo.insertMany([obj]);
    },

    list:function(){
      return  userinfo.find({usertype:{$gte:2,$lte:3}}).sort({usertype:1});
    },
    delById:function(_id){
        return  userinfo.deleteOne({_id:_id});
    },

    hahaha:function(){
        return  userinfo.find({usertype:2});
      },


}

module.exports = user;