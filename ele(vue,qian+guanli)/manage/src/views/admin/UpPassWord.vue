<template>
  <div class="upbox">
    <el-form class="containt" :rules="rules"   :model="upadminForms" ref="upadminForms">
      <h2>修改密码</h2>
      <el-form-item prop="adminpassword" label="管理员原密码">
        <el-input v-model="upadminForms.adminpassword" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="passWordpre" label="管理员新密码">
        <el-input placeholder="请输入管理员密码" type="password" v-model="upadminForms.passWordpre" ></el-input>
      </el-form-item>
      <el-form-item prop="passWordnow" label="再次输入管理员密码">
        <el-input placeholder="请输入管理员密码" type="password" v-model="upadminForms.passWordnow" ></el-input>
      </el-form-item>
       <el-form-item>
        <el-button type="primary"  style="width:100%" @click="submitForm" :loading="$store.state.isLoading">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
data(){
  return{
    upadminForms:{
      passWordpre:"",
      passWordnow:"",
      adminpassword:"",
      adminName:this.$store.state.admin.adminName
    },
    rules:{
        passWordpre: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ],
        passWordnow: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ],
        adminpassword: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ]
      }
  }
},
methods: {
  submitForm(){
    //console.log(this.upadminForms)
    this.$refs.upadminForms.validate(valid=>{
      if(valid){
          if(this.upadminForms.passWordpre===this.upadminForms.passWordnow){
            this.$store.dispatch('uppassword2',this)
          }else{
          this.$message.error('前后两次密码不一致');
        }
        }else{
          this.$message.error('请输入完整的信息');
        }
      })
  }
},
}
</script>

<style lang="scss" scoped>
   .upbox{
     .containt{
        width: 400px;
        padding: 20px 15px;
        border:2px solid #eaeaea;
        margin: 20px auto;
        box-shadow: #97cf97 5px 2px 5px;
      h2{
        text-align: center;
        margin-bottom: 18px;
      }
    }
   }
</style>>

