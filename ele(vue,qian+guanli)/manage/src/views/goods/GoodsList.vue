<template>
  <div>
    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
      <el-input placeholder="请输入搜索的商品类别关键字" v-model="goodsNamekey"></el-input>
    </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$store.dispatch('getGoodsList',{keyWord:goodsNamekey})">查询</el-button>
      </el-form-item>
        <el-form-item>
      <el-button type="success" @click="goodsVisible=true;">增加商品</el-button>
    </el-form-item>
</el-form>

     <el-table
                v-loading="$store.state.isLoading"
                :border="true"
                 :data="$store.state.goods.goodsList"
                style="width: 100%">
            <el-table-column
                    label="商品名称">
                <template slot-scope="scope">
                    {{scope.row.goodsNames}}
                </template>
            </el-table-column>

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

            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img height="100px" :src="'/ele/'+scope.row.goodsPic" alt="">
                </template>
            </el-table-column>
            
            <el-table-column label="店铺类别名字">
                <template  slot-scope="scope">
                    <a href="">{{scope.row.shopTypeName}}</a>
                </template>
            </el-table-column>

            <el-table-column label="店铺名字">
                <template slot-scope="scope">
                    <a href="">{{scope.row.shopName}}</a>
                </template>
            </el-table-column>

            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="primary"
                    >增加商品列表</el-button>
                    <el-button
                            size="mini"
                            type="primary"
                    >修改</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                    >删除</el-button>
                </template>
            </el-table-column>
        </el-table>  
         <PageList actionName="getGoodsList" :query="{keyWord:goodsNamekey}"></PageList>  
        <!-- <goods-type-dialog v-if="goodsTypeVisible" :shopId="shopId" :shopTypeId="shopTypeId" :goodsTypeVisible.sync="goodsTypeVisible"></goods-type-dialog>    -->
          <goods-dialog v-if="goodsVisible" :shopId="shopId" :shopTypeId="shopTypeId" :goodsVisible.sync="goodsVisible"></goods-dialog>
  </div>
</template>

<script>
import GoodsDialog from '../../components/goods/GoodsDialog'
export default {
  name: "GoodsList",
  components: {
      GoodsDialog
  },
  data(){
    return {
        goodsNamekey:"",
        goodsVisible:false,
        goodsTypeVisible:false,
        shopVisible:false,
        shopTypeId:"",
        shopId:""
            }
        },
  mounted () {
    this.$store.dispatch("getGoodsList",{keyWord:this.goodsNamekey})
  }
}
</script>

<style>

</style>