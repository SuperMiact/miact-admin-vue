<template>
  <div class="layout">
    <el-container v-if="showMenu" class="container">
      <el-aside class="aside" :width="isCollapse?'60px':'17%'">
        <div class="line" />
        <el-menu background-color="#222832" text-color="#fff" :collapse-transition="false" :router="true" :collapse="isCollapse">
          <div class="head" v-if="!isCollapse">
            <span>miact-admin-vue</span>
          </div>
          <!--一级栏目-->
          <el-menu-item index="/">
            <i class="el-icon-data-line"/>
            <span slot="title">首页</span>
          </el-menu-item>
          <!--一级栏目-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-data-line" />
              <span slot="title">ElementUI 学习</span>
            </template>
            <!--二级栏目-->
            <el-menu-item-group>
              <el-menu-item index="/inputStudy">
                <i class="el-icon-data-line" />输入框学习
              </el-menu-item>
              <el-menu-item index="/dateStudy">
                <i class="el-icon-data-line" />日期学习
              </el-menu-item>
              <el-menu-item index="/treeStudy">
                <i class="el-icon-data-line" />树形组件学习
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!--右边内容布局-->
      <el-container class="content">
        <Header @isCollapseOper="isCollapseChange" />
        <div class="main">
          <router-view />
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>
<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
      showMenu: true,
      isCollapse: false
    }
  },
  methods: {
    isCollapseChange (isCollapse) {
      this.isCollapse = isCollapse
    }
  }
}
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
  height: calc(100vh - 100px);
  overflow: auto;
  padding: 10px;
}
</style>

<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
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
</style>
