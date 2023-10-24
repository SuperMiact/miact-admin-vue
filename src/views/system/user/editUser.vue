<template>
    <el-dialog ref="userDig" title="编辑用户" :visible.sync="showUserModel" width="500px">
      <el-form label-position="right" ref="userForm" label-width="80px" :model="userTable" :rules="rules">
        <div align="left">
          <el-form-item label="用户名称" prop="username">
            <el-input v-model="userTable.username"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number :controls="false" :precision="0" class="inputNumber" v-model="userTable.age"></el-input-number>
          </el-form-item>
          <el-form-item label="手机号" prop="phone">
            <el-input v-model="userTable.phone"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userTable.email"></el-input>
          </el-form-item>
          <el-form-item label="状态" prop="status">
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
          rules:{
            username:[
               {required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            phone:[
               {required: true,validator:(rule, value, callback) => {
                  if (!value) {
                    callback(new Error('请输入手机号'));
                  } 
                  else if(!/^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-79])|(?:5[0-35-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1589]))\d{8}$/.test(value)){
                    callback(new Error('请输入正确的手机号'));
                  } 
                  else {
                    callback()
                  }
                }, trigger: 'blur'
              }
            ],
            email:[
               {required: true, message: '请输入邮箱', trigger: 'blur'}
            ],
            age:[
               {required: true, message: '请输入年龄', trigger: 'blur'}
            ]
          }
        };
    },
    methods: {
        show(type,data){
          this.type = type
          console.log(data)
          this.userTable = !data?this.userTable:data;
          this.showUserModel = true
        },
        submitUserForm(){
          console.log("submit")
          this.$refs["userForm"].validate((valid) => {
            if (valid) {
              console.log("ok")
              this.userTable.status = !this.userTable.status?0:this.userTable.status
              this.userTable.password = !this.userTable.password?'123456':undefined
              this.$emit('submitUser',this.userTable)
              this.closeUserForm()
            }
          });
        },
        closeUserForm(){
            this.userTable = {}
            this.showUserModel = false
        },
    }
}
</script>
<style>
.el-input-number .el-input__inner {
    -webkit-appearance: none;
    padding-left: 50px;
    padding-right: 50px;
    text-align: left;
}
.inputNumber {
  width: 100%;
}
</style>