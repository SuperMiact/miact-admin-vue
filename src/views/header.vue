<template>
<div>
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
            <el-avatar v-if="userInfo.headPortraitUrl&&userInfo.headPortraitUrl!=undefined&&userInfo.headPortraitUrl!=''" :size="33" :src="userInfo.headPortraitUrl"/>
            <el-avatar v-else class="avatarBG">
              <span class="nickNameColor">{{userInfo.loginUserName}}</span>
            </el-avatar>
          </div>
        </template>
        <div class="personal-info">
          <el-button class="head_button" @click="personInfoClick">个人信息</el-button>
        </div>
        <div class="edit-passwd">
          <el-button class="head_button" @click="editPasswd">修改密码</el-button>
        </div>
        <div class="logout">
          <el-button class="head_button" @click="userLogout">注销登录</el-button>
        </div>
      </el-popover>
    </div>
  </div>
  <div>
    <el-dialog  :visible.sync="editPasswdOpen" title="修改密码" width="350px">
        <div>
          <span style="font-size:16px">旧密码：</span>
          <el-input style="width:70%"></el-input>
        </div>
        <div>
          <span style="font-size:16px">新密码：</span>
          <el-input style="width:70%;margin-top: 20px;"></el-input>
        </div>
        <div class="edit-passwd-center">
          <el-button el-button style="margin-top:20px;width: 35%;" type="primary" plain>修改密码</el-button>
        </div>
    </el-dialog>
  </div>
</div>
</template>

<script>
import { userInfo } from '@/api/system/user/index'
import { logout } from '@/api/login'

export default {
  name: 'Header',
  data () {
    return {
      name: 'Home',
      userInfo: {
        loginUserName: '',
        headPortraitUrl: ''
      },
      breadList: [],
      isCollapse: false,
      editPasswdOpen: false,
    }
  },
  created () {
    this.getUserInfo()
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
    getUserInfo () {
      userInfo().then((res) => {
        if (res.code === '200') {
          window.sessionStorage.setItem('userInfo', JSON.stringify(res.results))
          this.$set(this.userInfo,"loginUserName",res.results.nickName)
          this.$set(this.userInfo,"headPortraitUrl",res.results.headPortraitUrl)
        }
      })
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
    personInfoClick(){
      this.$router.push('/personInfo')
    },
    editPasswd(){
      this.editPasswdOpen = true
    },
    userLogout () {
      logout().then((res) => {
        if (res.code === '200') {
          window.sessionStorage.clear();
          this.$message.success(res.message)
          this.$router.push('/login')
          this.$emit('clearMenuCache')
        }else{
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
  margin-top: 3px;
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
.head_button {
  width: 100%;
  border-left: none;
  border-right: none;
}
.nickNameColor {
  color: white;
}
.avatarBG{
  background-color:#122b3f;
}
.edit-passwd-center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content:center;
    align-items: center;
    -webkit-align-items:center;
}
</style>
