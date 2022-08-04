<template>
  <div class="layout">
    <el-container v-if="!$route.meta.showNav" class="container">
        <el-aside class="aside" :width="isCollapse ? '60px' : '17%'">
          <div class="line" />
          <el-menu
            background-color="#222832"
            text-color="#fff"
            :collapse-transition="false"
            :router="true"
            :collapse="isCollapse"
            :show-timeout="50"
            :hide-timeout="50"
          >
            <div class="head" v-if="!isCollapse">
              <span>Miact Admin</span>
            </div>
              <MenuTree :menuList="menuList" />
          </el-menu>
        </el-aside>
      <el-container class="content">
        <Header @isCollapseOper="isCollapseChange" />
        <div class="main">
          <router-view v-if="isRouterAlive"/>
        </div>
        <!-- <Footer /> -->
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
// import Footer from "@/components/Footer.vue";
import MenuTree from "@/components/MenuTree.vue";
export default {
  name: "App",
  components: {
    Header,
    // Footer,
    MenuTree,
  },
  watch: {
    $route() {
      if (this.$route) {
        this.selectMainMenu()
      }
    }
  },
  provide(){
    return{
      reload: this.reload
    }
  },
  data() {
    return {
      isCollapse: false,
      menuList: [],
      isRouterAlive: true,
    };
  },
  created() {
    this.selectMainMenu()
  },
  methods: {
    reload(){
      this.isRouterAlive = false
      this.$nextTick(()=>{
        this.isRouterAlive = true
      })
    },
    isCollapseChange(isCollapse) {
      this.isCollapse = isCollapse;
    },
    selectMainMenu() {
      this.$axios
        .get("/mainMenu/getMenu")
        .then((res) => {
          this.menuList = res.data;
        })
        .catch((err) => {
          this.$message.error(err);
        });
    },
  },
};
</script>
<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  background-color: #222832;
  width: 100%;
  overflow-x: scroll;
}
.aside::-webkit-scrollbar{
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  /*
    存在Footer底部时
    height: calc(100vh - 100px);
  */
  height: calc(100vh - 50px);
  overflow: auto;
  padding: 10px;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  font-family: Microsoft YaHei;
}
.el-menu {
  border-right: none !important;
}
.el-submenu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-submenu:first-child {
  border-top: none;
}
.el-submenu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
.el-menu--popup-right-start {
  margin-left: 0;
  margin-right: 5px;
}
</style>
