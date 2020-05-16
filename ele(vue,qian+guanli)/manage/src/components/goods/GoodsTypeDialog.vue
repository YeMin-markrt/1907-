<template>
   <el-dialog title="商品类别" :visible="goodsTypeVisible" @update:visible="bol=>$emit('update:goodsTypeVisible',bol)">
        <el-form>
            <el-form-item label="商品类别名称" >
                <el-input v-model="goodsTypeInfo.goodsTypeName" style="width:300px;" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="所属店铺" label-width="120px">
                <el-select v-model="goodsTypeInfo.shopTypeId" placeholder="请选择店铺类别" @change="changeShopTypeId" >
                    <el-option v-for="item in $store.state.shop.allShopTypeList" :key="item._id" :label="item.shopTypeName" :value="item._id"></el-option>
                </el-select>
                <el-select  v-model="goodsTypeInfo.shopId" placeholder="请选择店铺">
                    <el-option
                            v-for="item in $store.state.shop.shopListByTypeId"
                            :key="item._id"
                            :value="item._id"
                            :label="item.shopName"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="$emit('update:goodsTypeVisible',false)">取 消</el-button>
            <el-button type="primary" @click="addGoodsTypeList">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>

export default {
  name: "goodsTypeDialog",
   props:{
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
            },
            goodsName:{
                type:String,
                default:""
            },
            info:{
                type:Object,
                default:{}
            }
        },
     data(){
            return {
                goodsTypeInfo:{
                    goodsTypeName:"",
                    shopTypeId:"",
                    shopId:""
                }
            }

        },
     created(){
            if(this.info.shopTypeId){
                 this.goodsTypeInfo.shopTypeId = this.info.shopTypeId;
            } 
             if(this.info.goodsTypeName){
                 this.goodsTypeInfo.goodsTypeName = this.info.goodsTypeName;
            } 
            if(this.info.shopId){
                this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
                this.goodsTypeInfo.shopId = this.info.shopId;
            }
            if(!this.info.shopId){
                this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
            }
        },    
    methods: {
        changeShopTypeId(){
            this.goodsTypeInfo.shopId = "";
            this.$store.dispatch("getShopListByShopTypeId",this.goodsTypeInfo.shopTypeId);
        },
        async addGoodsTypeList(){
            if(this.info._id){
                await this.$axios.post("/upgoodsTypeList",{
                    id:this.info._id,
                    shopId:this.goodsTypeInfo.shopId,
                    goodsTypeName:this.goodsTypeInfo.goodsTypeName
                }) 
            }else{
                 await this.$axios.post("/goodsTypeList",{
                    shopId:this.goodsTypeInfo.shopId,
                    goodsTypeName:this.goodsTypeInfo.goodsTypeName
                }) 
            }
            this.$emit("update:goodsTypeVisible",false)
            this.$router.go(0);
        }
    },
    mounted () {
        this.$store.dispatch('getAllShopTypeList')
        this.$store.dispatch('getGoodsTypeList',{keyWord:this.goodsName})
    }
}
</script>

<style>

</style>