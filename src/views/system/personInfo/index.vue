<template>
<div>
    <div class="personInfoPage" >
        <el-form ref="form" class="pipForm" :model="form" label-width="80px">
        <el-form-item label="头像">
            <a href="#"  @click="subAvatar">
                <el-avatar v-if="userInfo.headPortraitUrl&&userInfo.headPortraitUrl!=undefined&&userInfo.headPortraitUrl!=''" :size="33" :src="userInfo.headPortraitUrl"/>
                <el-avatar v-else class="avatarBG" :size="50">
                    <span class="nickNameColor">{{userInfo.username}}</span>
                </el-avatar>
            </a>
        </el-form-item>
        <el-form-item label="名称">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item label="手机">
            <el-input v-model="form.phone"></el-input>
        </el-form-item>
        <el-form-item label="个人简介">
            <el-input type="textarea" :rows="5" v-model="form.personIntro"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改信息</el-button>
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
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </div>
            <div class="avatar-center">
                <el-button style="margin-top:20px;width: 60%;" type="primary" plain>完成</el-button>
            </div>
        </el-dialog>
    </div>
</div>

</template>
<script>
  export default {
    data() {
      return {
        form: {
          name: '',
        },
        avatarOpen:false,
        userInfo:{},
        imageUrl:''
      }
    },
    created(){
        this.userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')).data[0]
    },
    methods: {
      handleAvatarSuccess(res, file) {
        console.log(file)
        this.imageUrl = URL.createObjectURL(file.raw);
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
      onSubmit() {
        alert('submit!');
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