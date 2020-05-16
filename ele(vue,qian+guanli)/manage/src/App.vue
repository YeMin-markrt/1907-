<template>
<el-container>
  <el-header>
    <el-row>
      <el-col :span="8" class="info1" :style="{width:isCollapse?'64px':'240px'}">
      <strong v-if="isCollapse"><i class="el-icon-eleme strongtag"></i></strong>
      <strong v-else>饿了么管理系统</strong>
      </el-col>
      <el-col :span="8" class="info2">
        <i :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'" @click="isCollapse=!isCollapse"></i>
      </el-col>
      <el-col :span="8" class="info3">
        <el-dropdown>
          <span class="el-dropdown-link"><span>{{$store.state.admin.adminName}}</span><img src="./assets/logo.png"/><i class="el-icon-arrow-down el-icon--right"></i></span>
          <div class="exit">
            <el-dropdown-menu slot="dropdown" >
            <el-dropdown-item @click.native="$store.commit('OUT_LOGIN')">退出登录</el-dropdown-item>
          </el-dropdown-menu>
          </div>
        </el-dropdown>  
      </el-col>
    </el-row>
  </el-header>

  <el-container>
    <el-aside :style="{width:isCollapse?'auto':'240px'}">
      <el-menu :default-active="$route.path" class="el-menu-vertical-demo" :router="true" :collapse="isCollapse">
  <el-submenu index="1">
    <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">管理员设置</span>
    </template>
     <el-menu-item index="/"><i class="el-icon-date"></i>管理员日志</el-menu-item>
     <el-menu-item index="/adminList"><i class="el-icon-tickets"></i>管理员列表</el-menu-item>
     <el-menu-item index="/upPassWord"><i class="el-icon-edit"></i>修改密码</el-menu-item>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title">
      <i class="el-icon-s-tools"></i>
      <span slot="title">店铺管理</span>
    </template>
     <el-menu-item index="/shopTypeList"><i class="el-icon-postcard"></i>店铺类别列表</el-menu-item>
     <el-menu-item index="/shopList"><i class="el-icon-document"></i>店铺列表</el-menu-item>
    </el-submenu>

     <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-setting"></i>
      <span slot="title">商铺管理</span>
    </template>
     <el-menu-item index="/goodsTypeList"><i class="el-icon-notebook-1"></i>商品类别列表</el-menu-item>
     <el-menu-item index="/goodsList"><i class="el-icon-document"></i>商品列表</el-menu-item>
  </el-submenu>
</el-menu>
    </el-aside>
    <el-main>
       <router-view></router-view>
    </el-main>
  </el-container>
</el-container>
</template>

<script>
export default {
  data(){
    return{
      isCollapse:false
    }
  }
}
</script>

<style lang="scss">
*{
  padding: 0;
  margin:0;
  list-style: none;

}
 .el-header{
    background-color:  #409EFF;
    color: #fff;
    line-height: 60px;
    .info1{
      text-align:center;
      width: 240px;
      font-size:26px;
      border-right: 3px solid rgba(255, 255, 255, 0.986);
      .strongtag{
        font-size:40px;
        line-height: 60px;
      }
    }
    .info2{
      font-size:34px;
      margin-left: 20px;
      font-weight: bold;
    }
    .info3{
      float: right;
      text-align: right;
      padding-right: 20px;
      .el-dropdown-link{
         color: #fff;
        img{
          width: 40px;
          height: 40px;
          border-radius: 50%;
          vertical-align: middle;
        }
      }
      .exit{
        margin-top: -15px;
      }
    }
  }

   .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height:500px;
    // background-color:#F2F6FC;
  }

  
</style>
