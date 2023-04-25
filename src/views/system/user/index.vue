<template>
  <div>
    <div>
      <el-button class="button-top" v-if="isPerms('user:add')" @click="showEditUser('newUser')" type="success" size="small" plain>新增用户</el-button>
      <el-button class="button-top" v-if="isPerms('user:update')" @click="showEditUser('updateUser')" type="primary" :disabled="selectNum != 1" size="small" plain>修改</el-button>
      <el-button class="button-top" v-if="isPerms('user:delete')" @click="delUser(selectAllUser)" type="danger" :disabled="selectNum == 0" size="small" plain>删除</el-button>
      <el-button class="button-top" v-if="isPerms('user:bind')" @click="showBindRoles('newBindRole',selectAllUser)" type="success" size="small" :disabled="selectNum == 0" plain>分配角色</el-button>
      <el-button class="button-top" v-if="isPerms('user:export')" @click="exportUsers" type="warning" size="small" plain>导出</el-button>
    </div>
    <div>
      <el-table ref="tableF" :data="tableData" @select="userSelect" @select-all="userSelect" style="width: 100%" row-key="id" border lazy>
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名称" align="center"></el-table-column>
        <el-table-column prop="age" label="年龄" align="center"></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center"></el-table-column>
        <el-table-column prop="email" label="邮箱" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? "未启用" : "启用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="isPerms('user:update')" @click="showEditUser('updateUser',scope.row)">修改</el-button>
            <el-button type="text" v-if="isPerms('user:bind')" @click="showBindRoles('updateBindRole',scope.row)">分配角色</el-button>
            <el-button type="text" v-if="isPerms('user:delete')" @click="delUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="queryPerms.pageNo"
        :page-size="queryPerms.pageSize"
        layout="prev, pager, next, jumper"
        :total="pageTotal"
      >
      </el-pagination>
    </div>

    <editUser ref="editUserModel" @submitUser="submitUser"></editUser>
    <bindRoles ref="bindRolesModel" @submitRole="submitRole"></bindRoles>
  </div>
</template>

  <script>
import {
  queryUsers,
  delUser,
  exportUser,
} from "@/api/system/user";

import { getButtonPerms } from "@/utils/perms";
import { download, getRemoteFile } from "@/utils/download";
import editUser from "./editUser";
import bindRoles from "./bindRoles";

export default {
  name: "userModel",
  components: {
    editUser,
    bindRoles,
  },
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      // 复选框选中的数据
      selectAllUser: [],
      queryPerms:{
        pageNo: 1, // 当前页
        pageSize:10, // 每页多少条
      },
      // 数据总条目
      pageTotal: 0,
      // 复选选中数量
      selectNum:0,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    getUserList() {
      queryUsers(this.queryPerms).then((res) => {
        if (res.code === "200") {
          this.tableData = res.results.data;
          this.pageTotal = res.results.total;
        }
      });
    },
    isPerms(permsValue) {
      return getButtonPerms(permsValue);
    },
    // 获取复选框选中行数据
    userSelect(selection) {
      this.selectNum = selection.length
      this.selectAllUser = selection;
    },
    // 显示编辑用户界面
    showEditUser(type,data) {
      let userTable = type == 'newUser' ? {} : !data ? this.selectAllUser[0] : data
      this.$refs.editUserModel.show(type,userTable)
    },
    // 保存用户
    submitUser(result,message){
      if(result){
        this.$message.success(message);
        this.reload();
      }
    },
    // 删除用户
    delUser(data) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {  
          let ids = data instanceof Array ? data.map(v=>v.id):[data.id]
          delUser(ids).then((res) => {
            if(res.code == '200'){
              this.$message.success(res.message)
              this.reload()
            }
          });
        })
        .catch(() => {
          this.$message({type: "info",message: "已取消删除",});
        });
    },
    // 显示分配角色界面
    showBindRoles(type,data) {
      let roleData = type == 'newBindRole' ? {roleId: '', id: this.selectAllUser.map(v=> v.id)} : { roleId: data["roleId"], id: [data.id]}
      this.$refs.bindRolesModel.show(type,roleData);
    },
    // 保存分配角色
    submitRole(result,message){
      if(result){
        this.$message.success(message)
        this.reload()
      }
    },
    // 用户导出
    exportUsers() {
      let filename = "user-data.xlsx";
      exportUser({ query: {}, filename: filename })
        .then((res) => {
          if (res.success == true) {
            getRemoteFile(filename)
              .then((res) => download(res, filename))
              .catch(() => this.$message.error("下载失败"));
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    // 修改每页条数时 触发
    handleSizeChange(data) {
      console.log("size:" + data);
    },
    // 修改当前页数时 触发
    handleCurrentChange(data) {
      this.getUserList();
    },
  },
};
</script>
<style scoped>
.button-top{
  margin-bottom: 10px;
}
</style>