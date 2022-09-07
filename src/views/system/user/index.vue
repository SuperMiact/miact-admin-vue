<template>
    <div>
      <div>
        <el-button
          style="margin-bottom: 10px"
          type="primary"
          plain
          @click="openAddUser"
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
          <el-table-column prop="phone" label="手机号"> </el-table-column>
          <el-table-column prop="email" label="邮箱"> </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="editMenu(scope.row)">修改</el-button>
              <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    <el-dialog
        ref="roleDig"
        title="添加用户"
        :visible.sync="showUser"
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
                <el-form-item label="手机号">
                    <el-input v-model="userTable.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="userTable.email"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button>取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
        </el-dialog>
    </div>
  </template>
  
  <script>

  export default {
    name: 'role',
    components: {
    },
    inject: ['reload'],
    data () {
      return {
        showUser:false,
        userTable: {
            username: "",
            phone: "",
            email: "",
        },
        tableData:[]
      }
    },
    created () {
        this.getUserList()
    },
    methods: {
        openAddUser(){
            this.showUser = true
        },
        getUserList(){
            this.$axios({
                method: 'get',
                url: '/api/users/',
                params:{
                    'pageNo':1,
                    'pageSize':5,
                }
            }).then((res) => {
                if (res.data.code === '200') {
                    this.tableData = res.data.results.data
                }
            })
        }
    }
  }
  </script>
  