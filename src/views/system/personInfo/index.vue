<template>
<div>
    <div class="personInfoPage" >
        <el-form ref="form" class="pipForm" :model="userInfo" label-width="80px">
        <el-form-item label="头像">
            <a href="#"  @click="subAvatar">
                <el-avatar v-if="userInfo.headPortraitUrl&&userInfo.headPortraitUrl!=undefined&&userInfo.headPortraitUrl!=''" class="avatarBG" :size="50" :src="userInfo.headPortraitUrl"/>
                <el-avatar v-else class="avatarBG" :size="50">
                    <span class="nickNameColor">{{userInfo.nickName}}</span>
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
            <el-input type="textarea" :rows="5" v-model="userInfo.personInfo"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitPersonInfo">修改信息</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
    <div>
        <el-dialog  :visible.sync="avatarOpen" title="修改头像" width="350px">
            <div class="avatar-center">
                <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                    <img v-if="userInfo.headPortraitUrl" :src="userInfo.headPortraitUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="avatar-center">
                <el-button style="margin-top:20px;width: 60%;" type="primary" @click="avatarOpen = false" plain>完成</el-button>
            </div>
        </el-dialog>
    </div>
</div>

</template>
<script>
import {updateUser,userInfo} from '@/api/system/user/index'

  export default {
    name:'pagesonInfo',
    inject: ["reload"],
    data() {
      return {
        avatarOpen:false,
        userInfo:{},
      }
    },
    created(){
      this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo'))
    },
    methods: {
      handleAvatarSuccess(res, file) {
        this.userInfo.headPortraitUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      submitPersonInfo() {
        updateUser(this.userInfo).then(res=>{
          if(res.success==true){
            this.$message.success(res.message)
            this.getUserInfo()
          }else{
            this.$message.error(res.message)
          }
        })
      },
      getUserInfo(){
        userInfo().then(res=>{
          if(res.success==true){
            window.sessionStorage.setItem('userInfo', JSON.stringify(res.results))
            this.userInfo = res.results
          }
        })
      },
      subAvatar(){
        this.$set(this,"avatarOpen",true)
      }
    }
  }
</script>
<style scoped>
 .personInfoPage{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content:center;
    align-items: center;
    -webkit-align-items:center;
 }
 .pipForm{
    width:600px;
    margin-top: 25px;
 }
 .avatarBG{
    margin-left: 20px;
    background-color:#122b3f;
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
    border-color: #409EFF;
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
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-center{
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    -webkit-justify-content:center;
    align-items: center;
    -webkit-align-items:center;
  }
</style>