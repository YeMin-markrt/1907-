<template>
  <div class="adminbg">
    <el-form class="containt" :rules="rules"  :model="adminForm" ref="adminForm">
      <h2>饿了么后台管理系统</h2>
      <el-form-item prop="adminName">
        <el-input placeholder="请输入管理员账号" v-model="adminForm.adminName" ></el-input>
      </el-form-item>
      <el-form-item prop="passWord">
        <el-input placeholder="请输入管理员密码" type="password" v-model="adminForm.passWord" ></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary"  style="width:100%" @click="submitForm" :loading="$store.state.isLoading">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data(){
    return {
      adminForm:{
        adminName:"",
        passWord:""
      },
      rules:{
        adminName: [
            { required: true, message: '请输入管理员账号', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ],
        passWord: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ]
      }
    }
  },
  methods: {
    submitForm(){
      this.$refs.adminForm.validate(valid=>{
        if(valid){
           this.$store.dispatch("login",this);
        }else{
          this.$message.error('请输入完整的信息');
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.adminbg{
  position: absolute;
  top:0;
  left:0;
  bottom: 0;
  right: 0;
  background: url('../public/images/timg.jpg') no-repeat;
  background-size:100% 100%;
  .containt{
    width: 350px;
    padding: 20px 15px;
    border:2px solid #eaeaea;
    margin: 120px auto;
    box-shadow: #97cf97 5px 2px 5px;
    h2{
      text-align: center;
      margin-bottom: 20px;
    }
  }
}
</style>

