<template>
  <div class="header">
    <div class="left">
      <el-tooltip effect="dark" content="展开与折叠" placement="right">
        <i class="el-icon-s-grid" @click="isCollapseOper"> | </i>
      </el-tooltip>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="display: inline-block;margin-left: 10px"
      >
        <el-breadcrumb-item
          v-for="item in this.getBreadList()"
          :to="item.path"
          :key="item.path"
        >
          <span style="font-weight: bold">{{ item.info }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-popover
        placement="bottom"
        :width="320"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template #reference>
          <div class="author">
            <i class="icon el-icon-s-custom" />
            {{ (userInfo && userInfo.nickName) || "" }}
            <i class="el-icon-caret-bottom" />
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ (userInfo && userInfo.loginUserName) || "" }}</p>
          <p>昵称：{{ (userInfo && userInfo.nickName) || "" }}</p>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      name: "Home",
      userInfo: {
        loginUserName: "miact",
        nickName: "mawei"
      },
      breadList: [],
      isCollapse: false
    };
  },
  methods: {
    isCollapseOper() {
      this.isCollapse = !this.isCollapse;
      this.$emit("isCollapseOper", this.isCollapse);
    },
    getBreadList() {
      let currentPath = this.$route.path;
      let routes = this.$router.options.routes;
      return this.breadListSearch(routes, currentPath);
    },
    breadListSearch(routes, currentPath) {
      let breadList = this.breadList || [];
      breadList = [...this.breadList];
      for (let i = routes.length - 1; i >= 0; i--) {
        if (routes[i].path === currentPath) {
          if (routes[i].meta && routes[i].meta.info) {
            breadList.push({ path: routes[i].path, info: routes[i].meta.info });
          }
          return breadList;
        } else {
          if (routes[i].children && currentPath.indexOf(routes[i].path) === 0) {
            breadList.push({ path: routes[i].path, info: routes[i].meta.info });
            return this.breadListSearch(
              routes[i].children,
              currentPath,
              breadList
            );
          }
        }
      }
    }
  }
};
</script>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #c7c7c7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>
<style>
.popper-user-box {
  background: url("https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png")
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 0 !important;
}
.popper-user-box .nickname {
  position: relative;
  color: #ffffff;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
