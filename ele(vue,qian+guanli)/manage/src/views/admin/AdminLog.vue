<template>
  <div>
     <el-table
    :data="$store.state.admin.adminLog" :border="true"
    :highlight-current-row="true"
    v-loading="$store.state.isLoading"
    style="width: 100%">
    <el-table-column
      label="日志日期"
      width="200">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{scope.row.addTime | date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="管理员名称">
      <template slot-scope="scope">
         {{scope.row.adminName}}
      </template>
    </el-table-column>
    <el-table-column label="日志说明">
      <template slot-scope="scope">
          {{scope.row.detail}}
      </template>
    </el-table-column>
    <el-table-column label="日志类别">
      <template slot-scope="scope">
           {{$store.state.admin.adminTypeEnum[scope.row.logType]}}
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row._id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
    <PageList actionName="getAdminLog"></PageList>
  </div>
</template>

<script>
export default {
  name: "AdminLog",
  data() {
      return {
        dialogVisible: false
      };
    },
  methods: {
    handleDelete(id){
      this.dialogVisible=true;
      this.$confirm('确认删除？')
          .then(_ => {
            this.$store.dispatch('deleteAdminLog',id)
          })
          .catch(_ => {});
      }
    }
}
  

</script>


