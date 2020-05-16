<template>
  <div class="pagination">
      <el-pagination
      background
      layout="prev, pager, next"
       @current-change="pageIndex=>$store.dispatch(actionName,{
         ...query,
         ...{pageIndex}
       })"
      :page-count="$store.state.pageSum">
    </el-pagination>
    </div>
</template>

<script>
export default {
  name:"PageList",
  props:{
    actionName:{
      type:String,
      default:"getAdminLog"
    },
    query:{
      type:Object,
        default(){
           return {}
                }
            },
  },
  mounted () {
    this.$store.dispatch(this.actionName);
  }
}
</script>

<style lang="scss" scoped>
  .pagination{
   margin: 40px;
   text-align: center
  }
</style>>
