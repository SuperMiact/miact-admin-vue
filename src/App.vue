<template>
  <div class="layout">
    <el-container v-if="!$route.meta.showNav" class="container">
        <el-aside class="aside" :width="isCollapse ? '60px' : '17%'">
          <div class="line" />
          <el-menu
            background-color="#122b3f"
            text-color="#fff"
            :collapse-transition="false"
            :router="true"
            :collapse="isCollapse"
            :show-timeout="50"
            :hide-timeout="50"
          >
            <div class="head" v-if="!isCollapse">
              <span>Miact</span>
            </div>
              <MenuTree :menuList="menuList.length === 0?selectMainMenu():menuList" />
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
import Header from '@/views/header.vue'
// import Footer from '@/views/footer.vue';
import MenuTree from '@/views/system/menu/menuTree.vue'
import { getMenu } from '@/api/system/menu/index'

export default {
  name: 'App',
  components: {
    Header,
    // Footer,
    MenuTree
  },
  provide () {
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      isCollapse: false,
      menuList: [],
      isRouterAlive: true
    }
  },
  created () {
  },
  methods: {
    reload () {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
    isCollapseChange (isCollapse) {
      this.isCollapse = isCollapse
    },
    selectMainMenu () {
      getMenu().then(res => {
        let resData = res.results.filter(item => {
          return item['status'] > 0;
        })
        console.log(resData)


        
        this.menuList = res.results
      }).catch(err => {
        console.log(err)
      })
      return this.menuList
    },
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
  background-color: #122b3f;
  box-shadow: 0 0 8px 3px rgba(0,0,0,0.3);
  width: 100%;
}
.aside::-webkit-scrollbar{
  /*滚动条整体样式*/
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 6px;
  height: 6px;
}
.aside::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(251, 251, 252, 0.5);
}

.aside::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(99, 88, 140, 0.5);
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
.main::-webkit-scrollbar{
  /*滚动条整体样式*/
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 10px;
  height: 10px;
}
.main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(95, 95, 98, 0.5);
}
.main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(248, 247, 247, 0.5);
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
.el-menu--vertical>.el-menu--popup {
  max-height: 100vh;
  overflow-y: auto;
}
.el-menu--vertical>.el-menu--popup::-webkit-scrollbar{
  /*滚动条整体样式*/
  /*高宽分别对应横竖滚动条的尺寸*/
  width: 6px;
  height: 6px;
}
.el-menu--vertical>.el-menu--popup::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(251, 251, 252, 0.5);
}

.el-menu--vertical>.el-menu--popup::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(99, 88, 140, 0.5);
}
</style>
