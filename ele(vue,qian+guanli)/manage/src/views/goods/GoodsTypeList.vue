<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-input placeholder="请输入搜索的商品类别关键字" v-model="goodsName"></el-input>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$store.dispatch('getGoodsTypeList',{keyWord:goodsName})">查询</el-button>
      </el-form-item>
        <el-form-item>
      <el-button type="success" @click="shopTypeId='';shopId='';goodsTypeVisible=true;">增加商品类别</el-button>
    </el-form-item>
</el-form>

     <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.goods.goodsTypeList"
                style="width: 100%">
            <el-table-column
                    label="商品类别名称">
                <template slot-scope="scope">
                    {{scope.row.goodsTypeName}}
                </template>
            </el-table-column>


            <el-table-column
                    label="创建日期">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
                </template>
            </el-table-column>

            <el-table-column label="店铺类别名字">
                <template  slot-scope="scope">
                    <a href="" @click.prevent="goodsTypeVisible=true;info={shopTypeId:scope.row.shopTypeId,shopId:''}">{{scope.row.shopTypeName}}</a>
                </template>
            </el-table-column>

            <el-table-column label="店铺名字">
                <template slot-scope="scope">
                    <a href=""  @click.prevent="goodsTypeVisible=true;info={shopTypeId:scope.row.shopTypeId,shopId:scope.row.shopId}">{{scope.row.shopName}}</a>
                </template>
            </el-table-column>

            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                            @click="shopVisible=true;shopTypeId=scope.row.shopTypeId;shopName=scope.row.shopName"
                    >增加店铺</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                            @click="goodsTypeVisible=true;
                            info=scope.row"
                    >修改</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.row._id)"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>  
         <PageList actionName="getGoodsTypeList" :query="{keyWord:goodsName}"></PageList>  
          <GoodsTypeDialog v-if="goodsTypeVisible" :shopId="shopId" :shopTypeId="shopTypeId" :goodsTypeVisible.sync="goodsTypeVisible" :goodsName="goodsName" :info="info"></GoodsTypeDialog>
          
          <ShopDialog v-if="shopVisible" :shopVisible.sync="shopVisible"  :shopTypeId="shopTypeId" :shopName="shopName"></ShopDialog>
  </div>
</template>

<script>
import GoodsTypeDialog from '../../components/goods/GoodsTypeDialog'
import ShopDialog from "../../components/shop/ShopDialog";
export default {
  name: "GoodsTypeList",
  components: {
      GoodsTypeDialog,
      ShopDialog
  },
  data(){
    return {
        info:{},
        shopName:"",
        goodsName:"",
        goodsTypeVisible:false,
        shopVisible:false,
        ShopDialog:false,
        shopTypeId:"",
        shopId:""
            }
        },
   methods: {
     handleDelete(id){
        this.dialogVisible=true;
        this.$confirm('确认删除？')
            .then(_ => {
              this.$store.dispatch('deleteGoodsTypeList',id)
            })
            .catch(_ => {});
      },
  },
}
</script>

<style>

</style>