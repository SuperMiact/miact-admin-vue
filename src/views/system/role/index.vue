<template>
    <div>
      <div>
        <el-button
          style="margin-bottom: 10px"
          type="primary"
          plain
          @click="editRole('add')"
          size="small"
          >创建角色</el-button
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
          <el-table-column prop="roleName" label="角色名称" align="center"> </el-table-column>
          <el-table-column prop="remark" label="备注" align="center"> </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="editRole('update',scope.row)">修改</el-button>
              <el-button type="text" @click="delRole(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>

    <el-dialog
        ref="roleDig"
        title="创建角色"
        :visible.sync="showRoleModel"
        width="20%"
        center
        >
        <el-form
            label-position="right"
            label-width="80px"
            :model="roleTable"
            style="margin: 20px"
        >
            <div align="center">
                <el-form-item label="角色名称">
                    <el-input v-model="roleTable.roleName"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="roleTable.remark"></el-input>
                </el-form-item>
            </div>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="cancelForm">取 消</el-button>
            <el-button type="primary" @click="submitForm">确 定</el-button>
        </span>
        </el-dialog>
    </div>
  </template>
  
  <script>
  import {addRole,queryRoles,updateRole} from '@/api/system/role/index'

  export default {
    name: 'role',
    components: {
    },
    inject: ['reload'],
    data () {
      return {
        showRoleModel:false,
        roleTable: {
            roleName: "",
            remark: "",
        },
        tableData:[],
        modify:''
      }
    },
    created () {
      this.getRoleData()
    },
    methods: {
      getRoleData(){
        let query = {
          pageNo:1,
          pageSize:5 
        }
        queryRoles(query).then(res=>{
          if(res.code == "200"){
            this.tableData = res.results.data
          }
        })
      },
      editRole(type,data){
        if(type&&type!=undefined&&type!=""){
          this.modify = type
        }
        let modify = this.modify
        if(modify == "add"){
          this.roleTable = {
            roleName: "",
            remark: "",
          }
        }else if(modify == "update"){
          this.roleTable = {
            roleName: data.roleName,
            remark: data.remark,
          }
        }
        this.showRoleModel = true
      },
      delRole(data){
        console.log(data)
        // delRole(data).then(res=>{
        //   console.log(res)
        // })
      },
      submitForm(){
        let modify = this.modify
        if (modify == "add"){
          addRole(this.roleTable).then(res=>{
            if(res.code == "200"){
              this.$message.success('创建完成')
              this.reload()
            }
          }).catch(res=>{
            console.log(res)
          })
        }else if(modify == "update"){
          updateRole(this.roleTable).then(res=>{
            console.log(res)
          }).catch(res=>{
            console.log(res)
          })
        }
        this.showRoleModel = false
      },
      cancelForm(){
        this.roleTable = {
            roleName: "",
            remark: "",
        }
        this.showRoleModel = false
      },
    }
  }
  </script>
  