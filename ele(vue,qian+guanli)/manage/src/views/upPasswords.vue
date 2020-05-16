<template>
  <div class="upbox">
    <el-form class="containt" :rules="rules"   :model="upadminForm" ref="upadminForm">
      <h2>修改密码</h2>
      <el-form-item prop="adminName" label="管理员账号">
        <el-input :value="$store.state.admin.tempAdmin.adminName"></el-input>
      </el-form-item>
      <el-form-item prop="passWordpre" label="管理员新密码">
        <el-input placeholder="请输入管理员密码" type="password" v-model="upadminForm.passWordpre" ></el-input>
      </el-form-item>
      <el-form-item prop="passWordnow" label="再次输入管理员密码">
        <el-input placeholder="请输入管理员密码" type="password" v-model="upadminForm.passWordnow" ></el-input>
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
    upadminForm:{
       passWordpre:"",
      passWordnow:"",
    },
    rules:{
        passWordpre: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ],
        passWordnow: [
            { required: true, message: '请输入管理员密码', trigger: 'blur' },
            { min: 5, max: 8, message: '长度在 5 到 8 个字符', trigger: 'blur' }
          ]
      }
  }
},
methods: {
  submitForm(){
    this.$refs.upadminForm.validate(valid=>{
      if(valid){
          const id=this.$route.params.id;
          if(this.upadminForm.passWordpre===this.upadminForm.passWordnow){
            this.$store.dispatch('uppasswprd',this)
            this.upadminForm.passWordpre="",
            this.upadminForm.passWordnow=""
          }else{
          this.$message.error('前后两次密码不一致');
        }
        }else{
          this.$message.error('请输入完整的信息');
        }
      })
  }
},
mounted () {
  this.$store.dispatch('findname',this.$route.params.id)
}
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

