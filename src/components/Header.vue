<template>
  <div class="header">
    <div class="left">
      <el-tooltip effect="dark" content="展开与折叠" placement="right">
        <i :class="iconClassSelect()" @click="isCollapseOper"></i>
      </el-tooltip>
      <el-breadcrumb
        separator-class="el-icon-arrow-right"
        style="display: inline-block; margin-left: 10px"
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
        :width="30"
        trigger="click"
        popper-class="popper-user-box"
      >
        <template slot="reference">
          <div class="author">
            <el-avatar :size="33" :src="userInfo.headPortraitUrl"></el-avatar>
          </div>
        </template>
        <div class="personal-page">
          <el-button class="head_button">
            个人页面
          </el-button>
        </div>
        <div class="logout">
          <el-button class="head_button" @click="userLogout">注销登录</el-button>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      name: 'Home',
      userInfo: {
        loginUserName: '',
        nickName: '',
        headPortraitUrl: ''
      },
      breadList: [],
      isCollapse: false
    }
  },
  created () {
    let data = JSON.parse(window.sessionStorage.getItem('userInfo'))
    this.userInfo.loginUserName = data.data[0].username
    this.userInfo.nickName = data.data[0].username
    this.userInfo.headPortraitUrl = data.data[0].headPortraitUrl || 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
  },
  methods: {
    isCollapseOper () {
      this.isCollapse = !this.isCollapse
      this.$emit('isCollapseOper', this.isCollapse)
    },
    iconClassSelect () {
      if (this.isCollapse === true) {
        return 'el-icon-s-unfold'
      } else {
        return 'el-icon-s-fold'
      }
    },
    getBreadList () {
      let currentPath = this.$route.path
      let routes = this.$router.options.routes
      return this.breadListSearch(routes, currentPath)
    },
    breadListSearch (routes, currentPath) {
      let breadList = this.breadList || []
      breadList = [...this.breadList]
      for (let i = routes.length - 1; i >= 0; i--) {
        if (routes[i].path === currentPath) {
          if (routes[i].meta && routes[i].meta.info) {
            breadList.push({ path: routes[i].path, info: routes[i].meta.info })
          }
          return breadList
        } else {
          if (routes[i].children && currentPath.indexOf(routes[i].path) === 0) {
            breadList.push({ path: routes[i].path, info: routes[i].meta.info })
            return this.breadListSearch(
              routes[i].children,
              currentPath,
              breadList
            )
          }
        }
      }
    },
    userLogout () {
      this.$axios
        .get('/api/users/logout?token=' + window.sessionStorage.getItem('token'))
        .then((res) => {
          if (res.data.code === '200') {
            window.sessionStorage.removeItem('token')
            this.$message.success(res.data.message)
            this.$router.push('/login')
          }
        })
    }
  }
}
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
.right {
  margin-right: 20px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  cursor: pointer;
}
.popper-user-box {
  background: url("https://s.yezgea02.com/lingling-h5/static/account-banner-bg.png")
    50% 50% no-repeat !important;
  background-size: cover !important;
  border-radius: 5px !important;
}
.popper-user-box .personal-page {
  color: #222832;
}
.popper-user-box .personal-page .logout {
  cursor: pointer;
}
.head_button {
  width: 100%;
  border-left: none;
  border-right: none;
}
</style>
