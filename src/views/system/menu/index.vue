<template>
  <div>
    <div>
      <el-button style="margin-bottom: 10px" type="primary" plain @click="showEditMenu('add')" size="small">添加一级菜单</el-button>
    </div>
    <div>
      <el-table ref="tableForm" :data="tableData" style="width: 100%" row-key="id" border lazy :tree-props="{ children: 'childNode', hasChildren: 'hasChildren' }" 
      @select-all="dialogCheck" @select="dialogCheck">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="left" width="200" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="perms" label="菜单权限" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="菜单类型" align="center">
          <template slot-scope="scope">
            <span v-html="getLabelByValue(scope.row.type)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="地址" align="center" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="componentAddress" label="组件地址" align="center" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="sortOrder" label="排序" align="center"> </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
             {{scope.row.status===0?'已启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300px">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditMenu('add',scope.row)" v-show="scope.row.type!=2">添加</el-button>
            <el-button type="text" @click="showEditMenu('update',scope.row)">修改</el-button>
            <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <editMenu ref="editMenuModel" @submitMenuForm="submitMenuForm"></editMenu>
  </div>
</template>
<script>
import {getMenu, delMenu, addMenu, updateMenu} from '@/api/system/menu'
import editMenu from './editMenu'
import menuJson from '@/api/system/menu/menu.json'
export default {
  name: 'menuModel',
  components: {
    editMenu,
  },
  data () {
    return {
      tableData: [],
      radioData: {},
      iconList: [],
      menuTypeList: [],
    }
  },
  created () {
    this.selectMainMenu()
    this.getMenuTypeList()
  },
  methods: {
    dialogCheck: function (selection, row) {
      this.$refs.tableForm.clearSelection()
      if (selection.length === 0) return
      this.radioData = row
      if (row) {
        this.$refs.tableForm.toggleRowSelection(row, true)
      }
    },
    // 获取菜单类型
    getMenuTypeList(){
      this.menuTypeList = menuJson.menuTypeData
    },
    selectMainMenu () {
      getMenu().then((res) => {
        if (res.success === true) this.tableData = res.results
      })
    },
    // 显示菜单编辑界面
    showEditMenu (type, row) {
      this.$refs.editMenuModel.show(type,!!row?JSON.parse(JSON.stringify(row)):null)
    },
    // 保存菜单
    submitMenuForm(data){
      if(!!data){
        if(data.id){
          updateMenu(data).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.selectMainMenu()
            }
          })
        }else{
          addMenu(data).then(res=>{
            if(res.code == '200'){
              this.$message.success(res.message)
              this.selectMainMenu()
            }
          })
        }
      }
    },
    // 通过value获取label
    getLabelByValue(data){
      return this.menuTypeList.filter(v=>v.value == data)[0].label
    },
    delMenu (row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        if (row.childNode.length != 0) {
          this.$message.error('该节点下有子节点，请先删除子节点')
        }else{
          delMenu(row).then(res => {
            if (res.success === true) {
              this.$message.success('删除' + res.results + '条数据成功')
              this.selectMainMenu()
            } else {
              this.$message.error(res.message)
            }
          })
        }
      })
      .catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>
