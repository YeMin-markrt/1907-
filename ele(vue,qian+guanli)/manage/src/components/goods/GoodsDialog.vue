<template>
   <el-dialog title="添加商品类别" :visible="goodsVisible" @update:visible="bol=>$emit('update:goodsVisible',bol)">
        <el-form>
            <el-form-item label="商品类别名称" label-width="120px">
                <el-input v-model="goodsInfo.goodsNames"  autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属店铺" label-width="120px">
                <el-select @change="changeShopTypeId" v-model="goodsInfo.shopTypeId" placeholder="请选择">
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :label="item.shopTypeName" :value="item._id"></el-option>
                </el-select>
                <el-select  v-model="goodsInfo.shopId" placeholder="请选择店铺"  @change="changeShopId">
                    <el-option
                            v-for="item in $store.state.shop.shopListByTypeId"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopName"
                    ></el-option>
                </el-select>
                 <el-select  v-model="goodsInfo.goodsTypeId" placeholder="请选择商品类别" >
                    <el-option
                            v-for="item in $store.state.goods.goodsListByTypeId"
                            :key="item._id"
                            :value="item._id"
                            :label="item.goodsTypeName"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="店铺图片" label-width="120px">
                <el-upload
                        class="upload-demo"
                        action="/ele/goodsLists"
                        name="goodsPic"
                        :on-success="success"
                        :data="goodsInfo"
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
            <el-button @click="$emit('update:goodsVisible',false)">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>

export default {
  name: "GoodsDialog",
   props:{
       goodsVisible:{
           type:Boolean,
            default:false
       } ,
            goodsTypeVisible:{
                type:Boolean,
                default:false
            },
            shopTypeId:{
                type:String,
                default:""
            },
            shopId:{
                type:String,
                default:""
            }
        },
     data(){
            return {
                fileList:[],
                goodsInfo:{
                    goodsTypeId:"",
                    shopTypeId:"",
                    shopId:"",
                    goodsNames:""
                }
            }

        },
    methods: {
        changeShopTypeId(){
            this.goodsInfo.shopId = "";
            this.goodsInfo.goodsTypeId = "";
            this.$store.dispatch("getShopListByShopTypeId",this.goodsInfo.shopTypeId);
        },
        changeShopId(){
            this.goodsInfo.goodsTypeId = "";
            this.$store.dispatch("getgoodsListByShopTypeId",this.goodsInfo.shopId);
        },
        success(){
            this.$emit('update:goodsVisible',false)
        },
        submitForm(){
            this.$refs.upload.submit();
        }
    },
        mounted () {
            this.$store.dispatch('getAllShopTypeList')
        }
}
</script>

<style>

</style>