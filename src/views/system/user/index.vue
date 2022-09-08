<template>
    <div>
      <div>
        <el-button
          style="margin-bottom: 10px"
          type="primary"
          plain
          @click="editUser('add')"
          size="small"
          >添加用户</el-button
        >
      </div>
      <div>
        <el-table
          ref="tableF"
          :data="tableData"
          style="width: 100%"
          row-key="id"
          border
          lazy
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="username" label="用户名称"> </el-table-column>
          <el-table-column prop="age" label="年龄"></el-table-column>
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editUser('update',scope.row)">修改</el-button>
              <el-button type="text" @click="delUser(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="pageTotal">
        </el-pagination>
      </div>

    <el-dialog
        ref="roleDig"
        title="添加用户"
        :visible.sync="showUserModel"
        width="20%"
        center
        >
        <el-form
            label-position="right"
            label-width="80px"
            :model="userTable"
            style="margin: 20px"
        >
            <div align="center">
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
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="closeUserForm">取 消</el-button>
            <el-button type="primary" @click="submitUserForm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
  </template>
  
  <script>
  import { queryUsers,addUser,updateUser,delUser } from '@/api/system/user/index'

  export default {
    name: 'role',
    components: {
    },
    inject: ['reload'],
    data () {
      return {
        showUserModel:false,
        userTable: {
            username: "",
            phone: "",
            email: "",
            password: "123456",
            age: ""
        },
        tableData:[],
        modify:'',
        currentPage:1,
        pageTotal:0,
      }
    },
    created () {
        this.getUserList()
    },
    methods: {
        getUserList(){
          let params = {
            'pageNo':this.currentPage,
            'pageSize':5,
          }
          queryUsers(params).then((res) => {
            if (res.code === '200') {
                this.tableData = res.results.data
                this.pageTotal = res.results.total
            }
          })
        },
        editUser(type,data){
          this.modify = type
          if(type=="add"){
            this.userTable = {
              username: "",
              age:"",
              phone: "",
              email: "",
              password: "123456",
            }
          } else if (type=="update"){
            this.userTable = {
              username: data.username,
              phone: data.phone,
              email: data.email,
              id: data.id,
              age: data.age,
              version: data.version
            }
          }
          this.showUserModel = true
        },
        delUser(data){
          this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            delUser(data.id).then(res => {
              this.$message.success(res.message)
            })
            this.reload()
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
        },
        closeUserForm(){
          this.userTable = {
            username: "",
            phone: "",
            email: "",
            age:"",
            password: "123456",
          },
          this.showUserModel = false
        },
        submitUserForm(){
          let modifyVal = this.modify
          if(modifyVal == "add"){
            addUser(this.userTable).then((res=>{
              console.log(res)
              if(res.code=="200"){
                this.$message.success(res.message)
                this.reload()
              }
            }))
          }else if (modifyVal == "update"){
            updateUser(this.userTable).then(res=>{
              if(res.code=="200"){
                this.$message.success(res.message)
                this.reload()
              }
            })
          }
          this.showUserModel = false
          this.closeUserForm()
        },
        handleSizeChange(data){
          console.log('size:'+data)
        },
        handleCurrentChange(data){
          this.getUserList()
          // console.log(this.currentPage)
        }
    }
  }
  </script>
  