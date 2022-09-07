<template>
    <div>
      <div>
        <el-button
          style="margin-bottom: 10px"
          type="primary"
          plain
          @click="openAddRole"
          size="small"
          >添加角色</el-button
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
          <el-table-column prop="roleName" label="角色名称"> </el-table-column>
          <el-table-column prop="remark" label="备注"> </el-table-column>
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
        title="添加角色"
        :visible.sync="showRole"
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
                <el-form-item label="名称">
                    <el-input v-model="roleTable.roleName"></el-input>
                </el-form-item>
                <el-form-item label="地址">
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

  export default {
    name: 'role',
    components: {
    },
    inject: ['reload'],
    data () {
      return {
        showRole:false,
        roleTable: {
            roleName: "",
            remark: "",
        },
        tableData:[]
      }
    },
    created () {
    },
    methods: {
        openAddRole(){
            this.showRole = true
        }
    }
  }
  </script>
  