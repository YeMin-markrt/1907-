<template>
   <el-dialog  :title="title" :visible="shopTypeVisible" @update:visible="bol=>$emit('update:shopTypeVisible',bol)">
    <el-form>
    <el-form-item label="店铺类别名称" label-width="120px" >
      <el-input autocomplete="off" v-model="shopInfo.shopTypeName"></el-input>
    </el-form-item>
    <el-form-item label="店铺类别图片" label-width="120px">
      <el-upload
        class="upload-demo"
        action="/ele/shopTypeList"
        :headers="{authorization:$store.state.admin.token}"
        :auto-upload="false"
        :on-success="success"
        :data="shopInfo"
        :limit="1"
        :file-list="fileList"
        name="shopTypePic"
        ref="upload"
        list-type="picture">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="$emit('update:shopTypeVisible',false)">取 消</el-button>
    <el-button type="primary" @click="submitForm">确 定</el-button>
  </div>
</el-dialog>
</template>

<script>
export default {
   name: "ShopTypeDialog",
    props:{
      shopTypeName:{
        type:String,
        default:"",
      },
      shopTypeVisible:{
        type:Boolean,
        default:false
            },
      info:{
         type:Object,
          default(){
              return {}
            }
          }
        },
   data(){
     return{
      title:"添加店铺类别",
      fileList:[],
      dialogFormVisible:false,
      shopInfo:{
            shopTypeName:""
        }
     }
   },
   created () {
     if(this.info._id){
      this.title = "修改店铺类别";
       this.shopInfo.shopTypeName = this.info.shopTypeName;
       this.fileList.push({
          name:this.info.shopTypePic,
          url:"/ele/"+this.info.shopTypePic
        })
     }
   },
   methods:{
     success(){
        this.$emit('update:shopTypeVisible',false);
      if(this.$route.name === "shopTypeList"){
         this.$store.dispatch('getShopTypeList',{keyWord:this.shopTypeName})
      }else{
         this.$router.push("/shopTypeList")
      }
      this.shopInfo.shopTypeName="";
      this.fileList=[];
      },
     async submitForm(){
      //取消图片自动上传，点击确定才开始上传
      if(this.info._id){
         const formdata = new FormData();
         for(let key in this.shopInfo){
            formdata.set(key,this.shopInfo[key]);
          }
      formdata.set("shopTypeId",this.info._id);
      formdata.set("shopTypePic",document.querySelector(".el-upload__input").files[0])
       const data = await this.$axios.put("/shopTypeList",formdata);
        if(data.ok === 1){
          this.success();
        }else{
          alert(data.msg);
            }
      }else{
         this.$refs.upload.submit();
      }
      }
     },   
}
</script>

<style>

</style>