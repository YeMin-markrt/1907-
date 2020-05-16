<template>
  <el-dialog title="店铺信息" :visible="shopVisible" @update:visible="bol=>$emit('update:shopVisible',bol)">
        <el-form>
            <el-form-item label="店铺名称" label-width="120px">
                <el-input v-model="shopInfo.shopName" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="店铺类别" label-width="120px">
                <el-select v-model="shopInfo.shopTypeId" placeholder="请选择" @change="changeShopTypeId" >
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :label="item.shopTypeName" :value="item._id" class="chooseType"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺图片" label-width="120px">
                <el-upload
                        class="upload-demo"
                        action="/ele/shopLists"
                        name="shopPic"
                        :on-success="success"
                        :data="shopInfo"
                        :headers="{authorization:$store.state.admin.token}"
                        :auto-upload="false"
                        :limit="1"
                        :file-list="fileList"
                        ref="upload"
                        list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:shopVisible',false)">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
export default {
    name: "ShopDialog",
    props:{
        shopVisible:{
            type:Boolean,
            default:false
            },
        info:{
         type:Object,
          default(){
              return {}
            }
          },
          shopTypeId:{
                type:String,
                default:""
            },
     shopName:{
        type:String,
        default:"",
      },  
    shopNames:{
        type:String,
        default:"",
      },
        },

async created(){
            if(this.info._id){
                this.shopInfo.shopTypeId = this.info.shopTypeId;
                this.shopInfo.shopName = this.info.shopName;
                this.fileList.push({
                    name:this.info.shopPic,
                    url:"/ele/"+this.info.shopPic
                })
                const {shopTypeInfo}=await this. $axios.get("/shopTypeLists/"+this.info.shopTypeId)
                 this.shopInfo.shopTypeName=shopTypeInfo.shopTypeName
            } else{
                this.shopInfo.shopName="";
                this.fileList=[];
            }  
            if(this.shopTypeId){
                 this.shopInfo.shopTypeId = this.shopTypeId;
            }
            if(this.shopName){
                this.shopInfo.shopName = this.shopName;
            }
        },
    data(){
        return {
                shopInfo:{
                    shopTypeName:"",
                    shopName:"",
                    shopTypeId:"",
                },
                fileList:[]
            }
        },
        mounted () {
            this.$store.dispatch("getAllShopTypeList",{keyWord:this.shopNames});
        },
     methods:{
         async changeShopTypeId(){
             const {shopTypeInfo}=await this.$axios.get("/shopTypeLists/"+this.shopInfo.shopTypeId)
             this.shopInfo.shopTypeName=shopTypeInfo.shopTypeName
           },
         success(){
              if(this.$route.name === "shopList"){
                this.$store.dispatch("getShopList",
                {keyWord:this.shopNames});
                this.shopInfo.shopName="";
                this.shopInfo.shopTypeId="";
                this.shopInfo.shopTypeName="";
                this.fileList=[];      
                this.$emit('update:shopVisible',false);
                this.$emit('update:info',{});     
            }else{
                this.$router.push("/shopList")
            }
            },
            async submitForm(){
                //取消图片自动上传，点击确定才开始上传
                if(this.info._id){
                    const formdata = new FormData();
                    for(let key in this.shopInfo){
                        formdata.set(key,this.shopInfo[key]);
                    }
                formdata.set("shopId",this.info._id);
                formdata.set("shopPic",document.querySelector(".el-upload__input").files[0])
                formdata.set("shopTypeName",this.shopInfo.shopTypeName)
                const data = await this.$axios.put("/shopList",formdata);
                    if(data.ok === 1){
                        this.$emit('update:info',{});     
                        this.success();
                    }else{
                    this.$emit('update:info',{});  
                    alert(data.msg);
                        }
                }else{  
                    this.$refs.upload.submit();
                }
            },

     }   
}
</script>

<style>

</style>