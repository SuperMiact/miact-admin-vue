<template>
  <div>
    <div>
      <el-button
        style="margin-bottom: 10px"
        type="primary"
        plain
        @click="editMenu('add')"
        size="small"
        >添加主菜单</el-button
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
        :tree-props="{ children: 'childNode', hasChildren: 'hasChildren' }"
        @select-all="dialogCheck"
        @select="dialogCheck"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="name" label="名称" align="left"> </el-table-column>
        <el-table-column prop="perms" label="菜单权限" align="center"></el-table-column>
        <el-table-column label="菜单类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.type===0">目录</span>
            <span v-else-if="scope.row.type===1">菜单</span>
            <span v-else-if="scope.row.type===2">按钮</span>
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
            <el-button type="text" @click="editMenu('add',scope.row)">
              <span v-if="scope.row.type===0">添加菜单</span>
              <span v-else-if="scope.row.type===1">添加按钮</span>
            </el-button>
            <el-button type="text" @click="editMenu('update',scope.row)">修改</el-button>
            <el-button type="text" @click="delMenu(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      ref="menuDig"
      title="编辑菜单"
      :visible.sync="showMenuModel"
      width="360px"
      center
    >
      <el-form
        label-position="right"
        label-width="80px"
        :model="formData"
        style="margin: 20px"
      >
        <div align="center">
          <el-form-item label="菜单类型">
            <el-select placeholder="请选择" v-model="menuType" :disabled="true" @change="changeMenuType">
              <el-option
                v-for="mt in menuTypeList"
                :key="mt.menuValue"
                :label="mt.menuLabel"
                :value="mt.menuValue"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="地址" v-show="showAddr">
            <el-input v-model="formData.url"></el-input>
          </el-form-item>
          <el-form-item label="权限" v-show="showPerms">
            <el-input v-model="formData.perms"></el-input>
          </el-form-item>
          <el-form-item label="图标" prop="icon" v-show="showIcons">
            <el-select placeholder="请选择" v-model="formData.iconClass">
              <el-option
                v-for="item in iconList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <i :class="item.label"></i>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排序" >
            <el-input v-model="formData.sortOrder"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              @change="menuStatusChange"
              v-model="menuStatus"
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
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
import {addMenu, updateMenu, getMenu, delMenu, getIcons} from '@/api/system/menu/index'
export default {
  name: 'menuModel',
  components: {
  },
  inject: ['reload'],
  data () {
    return {
      tableData: [],
      radioData: {},
      showMenuModel: false,
      modify: '',
      formData: {
        name: '',
        url: '',
        sortOrder: '',
        iconClass: '',
        status: 0,
        pid: 0,
        type: '',
        perms: ''
      },
      iconList: [],
      menuType: '',
      menuTypeList: [
        {menuLabel: '目录', menuValue: '0'},
        {menuLabel: '菜单', menuValue: '1'},
        {menuLabel: '按钮', menuValue: '2'}
      ],
      menuStatus: false,
      showAddr: true,
      showPerms: true,
      showIcons: true
    }
  },
  created () {
    this.selectMainMenu()
  },
  methods: {
    dialogCheck: function (selection, row) {
      this.$refs.tableF.clearSelection()
      if (selection.length === 0) {
        return
      }
      this.radioData = row
      if (row) {
        this.$refs.tableF.toggleRowSelection(row, true)
      }
    },
    selectMainMenu () {
      getMenu().then((res) => {
        if (res.success === true) {
          this.tableData = res.results
        }
      })
        .catch((err) => {
          this.$message.error(err)
        })

      getIcons().then(res => {
        this.iconList = res
      })
    },
    editMenu (type, row) {
      this.menuStatus = false
      this.menuType = ''
      if (type && type !== '') {
        this.modify = type
      }
      this.showAddEditMenu(row)
      let modify = this.modify
      if (modify === 'add') {
        let pid = 0
        if (row && row !== '') {
          pid = row['id']
        }
        this.formData = {
          name: '',
          url: '',
          sortOrder: '',
          iconClass: '',
          status: this.menuStatus,
          pid: pid
        }
      } else if (modify === 'update') {
        this.menuStatus = row.status === 1
        if (row.type === 0) this.menuType = '目录'
        else if (row.type === 1) this.menuType = '菜单'
        else if (row.type === 2) this.menuType = '按钮'
        this.showUpdateEditMenu(row)

        this.formData = row
      }

      this.showMenuModel = true
    },
    showAddEditMenu(data) {
      if (data && data !== ''){
        if (data.type === 0) {
          this.showAddr = true
          this.showPerms = true
          this.showIcons = true
          this.menuType = '菜单'
        }else if (data.type === 1) {
          this.showAddr = false
          this.showPerms = true
          this.showIcons = false
          this.menuType = '按钮'
        }
      }else {
        this.showAddr = true
        this.showPerms = true
        this.showIcons = true
        this.menuType = '目录'
      }
    },
    showUpdateEditMenu(data) {
      if (data && data !== ''){
        switch (data.type) {
          case 0:
            this.showAddr = true
            this.showPerms = true
            this.showIcons = true
            this.menuType = '目录'
            break
          case 1:
            this.showAddr = true
            this.showPerms = true
            this.showIcons = true
            this.menuType = '菜单'
            break
          case 2:
            this.showAddr = false
            this.showPerms = true
            this.showIcons = false
            this.menuType = '菜单'
            break
        }
      }
    },
    delMenu (row) {
      this.$confirm('此操作将删除该条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (row.childNode.length === 0) {
            delMenu(row).then(res => {
              if (res.success === true) {
                this.$message.success('删除' + res.results + '条数据成功')
                this.reload()
              } else {
                this.$message.error(res.message)
              }
            })
          } else {
            this.$message.error('该节点下有子节点，请先删除子节点')
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    menuStatusChange (data) {
      this.formData.status = data === true ? 1 : 0
    },
    submitForm () {
      let modify = this.modify
      if (modify === 'add') {
        addMenu(this.formData).then((res) => {
          if (res.success === true) {
            this.$message.success('成功，有' + res.results + '条数据被处理！')
            this.reload()
          } else {
            this.$message.error(res.message)
          }
        })
      } else if (modify === 'update') {
        updateMenu(this.formData).then((res) => {
          if (res.success === true) {
            this.$message.success('修改成功，有' + res.results + '条数据被处理！')
            this.reload()
          } else {
            this.$message.error(res.message)
          }
        })
      }
      this.cancelForm()
    },
    cancelForm () {
      this.formData = {
        name: '',
        url: '',
        sortOrder: '',
        iconClass: '',
        status: 0,
        pid: 0
      }
      this.menuStatus = false
      this.showMenuModel = false
    },
    changeMenuType (data) {
      if (data && data !== '') {
        this.formData.type = data
      }
    }
  }
}
</script>
