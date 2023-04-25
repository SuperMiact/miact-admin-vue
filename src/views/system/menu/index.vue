<template>
  <div>
    <div>
      <el-button style="margin-bottom: 10px" type="primary" plain @click="showEditMenu('add')" size="small">添加主菜单</el-button>
    </div>
    <div>
      <el-table ref="tableForm" :data="tableData" style="width: 100%" row-key="id" border lazy :tree-props="{ children: 'childNode', hasChildren: 'hasChildren' }" 
      @select-all="dialogCheck" @select="dialogCheck">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="left"> </el-table-column>
        <el-table-column prop="perms" label="菜单权限" align="center"></el-table-column>
        <el-table-column label="菜单类型" align="center">
          <template slot-scope="scope">
            <span v-html="getLabelByValue(scope.row.type)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="地址" align="center"> </el-table-column>
        <el-table-column prop="sortOrder" label="排序" align="center"> </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
             {{scope.row.status===1?'已启用':'未启用'}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditMenu('add',scope.row)">
              <span v-if="scope.row.type===0">添加菜单</span>
              <span v-else-if="scope.row.type===1">添加按钮</span>
            </el-button>
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
import {getMenu, delMenu, getIcons} from '@/api/system/menu'
import editMenu from './editMenu'

export default {
  name: 'menu',
  components: {
    editMenu,
  },
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      radioData: {},
      iconList: [],
      menuTypeList: [
          {label:'目录',value:'0'},
          {label:'菜单',value:'1'},
          {label:'按钮',value:'2'},
      ],
    }
  },
  created () {
    this.selectMainMenu()
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
    selectMainMenu () {
      getMenu().then((res) => {
        if (res.success === true) {
          this.tableData = res.results
        }
      })
      getIcons().then(res => {
        this.iconList = res
      })
    },
    // 显示菜单编辑界面
    showEditMenu (type, row) {
      this.$refs.editMenuModel.show(type,row)
    },
    // 保存菜单
    submitMenuForm(result,message){
      if(result){
        this.$message.success(message)
        this.reload()
      }
    },
    // 通过value获取label
    getLabelByValue(data){
      return this.menuTypeList.map(v=>v.value == data).label
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
              this.reload()
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
