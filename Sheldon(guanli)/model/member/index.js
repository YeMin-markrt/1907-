var buginfo = require("./memberModel.js");
var member = {
  list: function () {
    //产品经理查看所有项目信息
      // buginfo.find(obj,function(err,data){
      //   // console.log(data);
      // })
      return buginfo.find();
   

  },

  listDeveByUserId1: function () {
    //开发者查看自己开发的项目的信息 
    //包含提交功能
    return  buginfo.find();

  },



  listDeveByUserId: function (obj) {
    //开发者查看自己开发的项目的信息 
    //包含提交功能
    return  buginfo.find(obj);

  },

  devCreate: function (obj) {
    //开发者提交项目
    return  buginfo.insertMany([obj]);

  },




  listTestByUserIdAll: function () {
    return buginfo.find({ type: 2 });

    //测试者查看开发者提交的项目, 提交bug,给开发者修改  ,记录测试者,给指定的开发者修改,并记录指定开发者

    //包含提审核项目是否通过功能
  },

  listTestByUserIdNeed: function () {
    return buginfo.find({ type:2, typestate: 1 });
  },


  testupdate: function (obj1, obj2) {
    //测试者审批请假 obj1表示更新的条件  obj2表示更新的内容
    //测试者提交bug信息
    return buginfo.updateOne(obj1, obj2);
  },


  update:function(obj1,obj2){
    //测试者判断修改的bug是否成功
    return  buginfo.updateOne(obj1,obj2);
  }


}
module.exports = member;





