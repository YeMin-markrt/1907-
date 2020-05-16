<template>
  <div>
    <div>
      <el-form :inline="true" class="demo-form-inline" :title="title">
      <el-form-item>
        <el-input  placeholder="请输入搜索的店铺类别关键字" v-model="shopNames"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$store.dispatch('getShopList',{keyWord:shopNames})">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="shopVisible=true" >增加店铺</el-button>
        <el-button type="success"  @click="shopTypeVisible = true">增加店铺类别</el-button>
        </el-form-item>
      </el-form>
    </div>

     <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                :data="$store.state.shop.shopList"
                style="width: 100%">
            <el-table-column
                    label="id"
                    >
                <template slot-scope="scope">
                    {{scope.row._id}}
                </template>
            </el-table-column>
            <el-table-column
                    label="店铺名字"
                    >
                <template slot-scope="scope">
                    {{scope.row.shopName}}
                </template>
            </el-table-column>


            <el-table-column
                    label="创建日期"
                    >
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.addTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column label="店铺类别的名字">
                <template slot-scope="scope">
                    {{scope.row.shopTypeName}}
                </template>
            </el-table-column>

            <el-table-column label="店铺图片">
                <template slot-scope="scope">
                    <img height="100px" :src="'/ele/'+scope.row.shopPic" alt="">
                </template>
            </el-table-column>


            <el-table-column label="操作">
      <template slot-scope="scope">
            <el-button
                            size="mini"
                            type="primary"
                            @click="shopId=scope.row._id;shopVisible=true;info=scope.row"        
                    >修改</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                    @click="handleDelete(scope.row._id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

   <PageList actionName="getShopList" :query="{keyWord:shopName}"></PageList>
   <shop-type-dialog v-if="shopTypeVisible" :shopTypeVisible.sync="shopTypeVisible" ></shop-type-dialog>
    <shop-dialog v-if="shopVisible" :shopVisible.sync="shopVisible" :info.sync="info"    :title="title" :shopNames="shopNames" :shopName="shopName"></shop-dialog>
  </div>
</template>

<script>
import ShopDialog from "../../components/shop/ShopDialog";
import ShopTypeDialog from '../../components/shop/ShopTypeDialog'
export default {
  name: "ShopList",
  components: {
    ShopDialog,
    ShopTypeDialog
  },

  data(){
    return {
    dialogVisible:false,
    shopNames:"",
    shopName:"",
    title:"店铺信息",
    shopTypeVisible:false,
    shopVisible:false, 
    info:{},
      }
    },
    methods: {
     handleDelete(id){
        this.dialogVisible=true;
        this.$confirm('确认删除？')
            .then(_ => {
              this.$store.dispatch('deleteShopList',id)
            })
            .catch(_ => {});
      },
  },
}
</script>

<style>

</style>