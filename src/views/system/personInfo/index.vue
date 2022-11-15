<template>
  <div>
    <div class="personInfoPage">
      <el-form ref="form" class="pipForm" :model="userInfo" label-width="80px">
        <el-form-item label="头像">
          <a href="#" @click="subAvatar">
            <el-avatar
              v-if="userInfo.headPortraitUrl && userInfo.headPortraitUrl !== ''"
              class="avatarBG"
              :size="50"
              :src="userInfo.headPortraitUrl"
            />
            <el-avatar v-else class="avatarBG" :size="50">
              <span class="nickNameColor">{{ userInfo.nickName }}</span>
            </el-avatar>
          </a>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userInfo.nickName"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="userInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
          <el-input v-model="userInfo.phone"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input
            type="textarea"
            :rows="5"
            v-model="userInfo.personInfo"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitPersonInfo"
            >修改信息</el-button
          >
          <!--            <el-button>取消</el-button>-->
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-dialog :visible.sync="avatarOpen" title="修改头像" width="350px">
        <div class="avatar-center">
          <el-upload
            class="avatar-uploader"
            action="/api/users/savePersonImg"
            :headers="myHeaders"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="userInfo.headPortraitUrl"
              :src="userInfo.headPortraitUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="avatar-center">
          <el-button
            style="margin-top: 20px; width: 60%"
            type="primary"
            @click="avatarOpen = false"
            plain
            >完成</el-button
          >
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import { updateUser, userInfo } from "@/api/system/user/index";

export default {
  name: "pagesonInfo",
  inject: ["reload"],
  data() {
    return {
      avatarOpen: false,
      userInfo: {},
      myHeaders: { token: sessionStorage.getItem("token") },
    };
  },
  created() {
    this.userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.userInfo.headPortraitUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isPNF = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isPNF) {
        this.$message.error("上传头像图片只能是 PNG 格式!");
        return false;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        return false;
      }
      // 调用[限制图片尺寸]函数
      return this.limitFileWH(50, 50, file).then((res) => {
        file.isFlag = res;
        return file.isFlag ? true : reject(false);
      });
    },
    // 限制图片尺寸
    limitFileWH(limitWidth, limitHeight, file) {
      const _this = this;
      let imgWidth = "";
      let imgHight = "";
      const isSize = new Promise(function (resolve, reject) {
        const width = limitWidth;
        const height = limitHeight;
        const _URL = window.URL || window.webkitURL;
        const img = new Image();
        img.onload = function () {
          imgWidth = img.width;
          imgHight = img.height;
          const valid = img.width === width && img.height === height;
          valid ? resolve() : reject(new Error());
        };
        img.src = _URL.createObjectURL(file);
      }).then(
        () => {
          return true;
        },
        () => {
          _this.$message.warning({
            message:
              "上传图片的尺寸应为" +
              limitWidth +
              "*" +
              limitHeight +
              "，当前上传图片的尺寸为：" +
              imgWidth +
              "*" +
              imgHight,
            btn: false,
          });
          return false;
        }
      );
      return isSize;
    },
    submitPersonInfo() {
      updateUser(this.userInfo).then((res) => {
        if (res.success === true) {
          this.$message.success(res.message);
          this.getUserInfo();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    getUserInfo() {
      userInfo().then((res) => {
        if (res.success === true) {
          sessionStorage.setItem(
            "userInfo",
            JSON.stringify(res.results)
          );
          this.userInfo = res.results;
        }
      });
    },
    subAvatar() {
      this.$set(this, "avatarOpen", true);
    },
  },
};
</script>
<style scoped>
.personInfoPage {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
}
.pipForm {
  width: 600px;
  margin-top: 25px;
}
.avatarBG {
  margin-left: 20px;
  background-color: #122b3f;
}
</style>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 50px;
  height: 50px;
  display: block;
}
.avatar-center {
  display: flex;
  display: -webkit-flex;
  justify-content: center;
  -webkit-justify-content: center;
  align-items: center;
  -webkit-align-items: center;
}
</style>
