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
              :active-value="0"
              :inactive-value="1"
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
          this.$emit('submitUser',this.userTable)
          this.closeUserForm()
        },
        closeUserForm(){
            this.userTable = {}
            this.showUserModel = false
        },
    }
}
</script>
