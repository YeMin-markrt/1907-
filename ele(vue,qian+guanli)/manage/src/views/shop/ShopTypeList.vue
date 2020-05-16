<template>
  <div>
    <div>
      <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="shopTypeName"  placeholder="请输入搜索的店铺类别关键字"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="$store.dispatch('getShopTypeList',{keyWord:shopTypeName})">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="shopTypeVisible=true;info={}">增加店铺类别</el-button>
        </el-form-item>
      </el-form>
    </div>

  
<el-table v-loading="$store.state.isLoading" :border="true" :data="$store.state.shop.shopTypeList" style="width: 100%">
  <el-table-column label="id" width="230">
    <template slot-scope="scope">
       {{scope.row._id}}
     </template>
  </el-table-column>
  <el-table-column label="创建日期" width="200">
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
  <el-table-column label="店铺类别的图片">
    <template slot-scope="scope">
       <img height="100px" :src="'/ele/'+scope.row.shopTypePic" alt="">
    </template>
  </el-table-column>
  <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="primary"
          @click="shopTypeVisible=true;info=scope.row;"
        >修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
  </el-table-column>
</el-table>
  <PageList actionName="getShopTypeList" :query="{keyWord:shopTypeName}"></PageList>
 <shop-type-dialog v-if="shopTypeVisible" :info="info" :shopTypeVisible.sync="shopTypeVisible" :shopTypeName="shopTypeName"></shop-type-dialog>
  </div>
</template>

<script>
import ShopTypeDialog from '../../components/shop/ShopTypeDialog'
export default {
  components: {
    ShopTypeDialog
  },
  data(){
    return {
      dialogVisible:false,
      shopTypeName:"",
      shopTypeVisible:false, 
      info:{},
          }
        },
  methods: {
     handleDelete(id){
        this.dialogVisible=true;
        this.$confirm('确认删除？')
            .then(_ => {
              this.$store.dispatch('deleteShopType',id)
            })
            .catch(_ => {});
      },
  },
}
</script>

<style>

</style>