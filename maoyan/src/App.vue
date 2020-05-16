<template>
  <div id="app">
    <div id="nav" v-show="this.$store.state.flag">
      <router-link to="/home/nowplaying" ><span class="iconfont icon-dianying"></span><p>电影</p></router-link>
      <router-link to="/Cinema"><span class="iconfont icon-yingyuan"></span><p>影院</p></router-link>
      <router-link to="/Mine"><span class="iconfont icon-wo-de"></span><p>我的</p></router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url("http://at.alicdn.com/t/font_1618026_idm5mjnwmc.css");

*{
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
}

input, textarea, select {
  border: 0;  // 去除未选中状态边框
  outline: none; // 去除选中状态边框
  background-color: rgba(0, 0, 0, 0);// 透明背景

}

input[type="button"], input[type="reset"], input[type="submit"] {
  cursor: pointer; 
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  width: 100%;
  height: 100px;
  box-sizing: border-box;
  display: flex;
  position: fixed;
  left: 0;
  bottom:0;
  background: #fff;
  z-index: 999;
  
}

#nav a {
  padding-top: 10px;
  flex: 1;
  font-weight: bold;
  color: #696969;
  font-size: 24px;
  .iconfont{
  font-size:48px;
}

}


#nav a.router-link-exact-active {
  color: #f03d37;
}
</style>
