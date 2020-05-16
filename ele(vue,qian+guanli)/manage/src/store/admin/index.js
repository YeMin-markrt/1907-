import axios from "axios";
const state={
  adminName:localStorage.adminName || null,
  token:localStorage.token || null,
  adminLog:[],
  adminList:[],
  adminTypeEnum:{
    1:"管理员登陆成功",
    2:"管理员登陆失败"
},
  tempAdmin:{},
};
const mutations={
  CHANGE_TEMP_ADMIN(state,tempAdmin){
    state.tempAdmin=tempAdmin;
  },
  CHANGE_USER_NAME(state,{adminName,token}){
    state.adminName = localStorage.adminName = adminName;
    state.token=localStorage.token=token;
  },
  OUT_LOGIN(state){
    localStorage.clear()
    state.adminName=null;
  },
  CHANGE_ADMIN_LOG(state,adminLog){
    state.adminLog=adminLog
  },
  CHANGE_ADMIN_LIST(state,adminList){
    state.adminList = adminList;
},
};
const actions = {
  async login({commit},vm){
    const data = await axios.post("/login",vm.adminForm);
      if(data.ok === 1){
        commit("CHANGE_USER_NAME",{adminName:vm.adminForm.adminName,token:data.token});
    }else{
        vm.$message.error(data.msg);
    }
},

async findname({commit},id){
  const data=await axios.get("/findAdmin/"+id);
  if(data.ok===1){
    commit("CHANGE_TEMP_ADMIN",data.info)
  }
},
async uppasswprd({dispatch},vm){
  const data=await axios.post("/upAdmin/"+vm.$route.params.id,vm.upadminForm);
  if(data.ok===1){
    dispatch("getAdminList")
    vm.$message.success(data.msg);
  }else{
    vm.$message.error(data.msg);
  }
},
async uppassword2({dispatch},vm){
  const data=await axios.post("/upAdmin2",vm.upadminForms);
  if(data.ok===1){
    dispatch("getAdminList")
    vm.$message.success(data.msg);
    vm.upadminForms.passWordpre="",
    vm.upadminForms.passWordnow="",
    vm.upadminForms.adminpassword=""
  }else{
    vm.$message.error(data.msg);
  }
},
async getAdminLog({commit},{pageIndex=1}={}){
  const {adminLog}=await axios.get("/adminLog",{
    params:{
      pageIndex
    }
  });
  commit("CHANGE_ADMIN_LOG",adminLog)
},
async getAdminList({commit},{pageIndex=1}={}){
  const {adminList}=await axios.get("/adminList",{
    params:{
      pageIndex
    }
  });
  commit("CHANGE_ADMIN_LIST",adminList)
},
async deleteAdminLog(context,id){
  const data=await await axios.delete("/adminLog/"+id);
  if(data.ok===1){
    context.dispatch('getAdminLog',context.rootState.pageIndex)
  }else{
    alert("删除失败")
  }
},
async deleteAdminList(context,id){
  const data=await await axios.delete("/adminList/"+id);
  if(data.ok===1){
    context.dispatch('getAdminList',context.rootState.pageIndex)
  }else{
    alert("删除失败")
  }
}
};
export default{
  state,
  mutations,
  actions
}