<template>
    <el-dialog ref="userDig" title="编辑用户" :visible.sync="showUserModel" width="500px">
      <el-form label-position="right" label-width="80px" :model="userTable">
        <div align="left">
          <el-form-item label="用户名称">
            <el-input v-model="userTable.username"></el-input>
          </el-form-item>
          <el-form-item label="年龄">
            <el-input v-model="userTable.age"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="userTable.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="userTable.email"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              :active-value="1"
              :inactive-value="0"
              v-model="userTable.status"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </div>
      </el-form>
      <div align="right">
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submitUserForm">确 定</el-button>
          <el-button @click="closeUserForm">取 消</el-button>
        </span>
      </div>
    </el-dialog>
</template>
<script>
import {
  addUser,
  updateUser,
} from "@/api/system/user";
export default {
    name: "editUser",
    components: {},
    data() {
        return {
          type:'',
          showUserModel: false,
          userTable: {},
        };
    },
    methods: {
        show(type,data){
          this.type = type
          this.userTable = !data?this.userTable:data;
          this.showUserModel = true
        },
        submitUserForm(){
          this.userTable.status = !this.userTable.status?0:this.userTable.status
          this.userTable.password = !this.userTable.password?'123456':undefined
          this.type == "newUser" ? addUser(this.userTable).then(res=>{
            if(res.code == '200') {
              this.$emit('submitUser',true,res.message)
            }else{
              this.$message.error(res.message)
            }
          }): updateUser(this.userTable).then(res=>{
            if(res.code == '200') {
              this.$emit('submitUser',true,res.message)
            }else{
              this.$message.error(res.message)
            }
          })
          
          this.closeUserForm()
        },
        closeUserForm(){
            this.userTable = {}
            this.showUserModel = false
        },
    }
}
</script>
