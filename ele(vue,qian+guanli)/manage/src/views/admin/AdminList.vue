<template>
  <div>
     <el-table
    :data="$store.state.admin.adminList" :border="true"
    :highlight-current-row="true"
    v-loading="$store.state.isLoading"
    style="width: 100%">
    <el-table-column
      label="最后登陆日期"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.loginTime | date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="管理员名称">
      <template slot-scope="scope">
         {{scope.row.adminName}}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
         <el-button
          size="mini"
          @click="handleEdit(scope.row._id)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <PageList actionName="getAdminList"></PageList>
  </div>
</template>

<script>
export default {
  name: "AdminList",
  data() {
      return {
        dialogVisible: false
      };
    },
  methods: {
    handleEdit(_id){
      this.$router.push({name:"upPasswords",params:{id:_id}})
    },
    handleDelete(id){
      this.dialogVisible=true;
      this.$confirm('确认删除？')
          .then(_ => {
            console.log(id)
            this.$store.dispatch('deleteAdminList',id)
          })
          .catch(_ => {});
      }
    }
}
</script>


