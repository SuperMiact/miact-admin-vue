<template>
  <div>
    <div>
      <el-button
        style="margin-bottom: 10px"
        type="success"
        plain
        @click="editUser('add')"
        v-if="isPerms('user:add')"
        size="small"
        >新增用户</el-button
      >
      <el-button
        style="margin-bottom: 10px"
        type="primary"
        plain
        :disabled="updateStatus"
        @click="editUser('update')"
        v-if="isPerms('user:update')"
        size="small"
        >修改</el-button
      >
      <el-button
        style="margin-bottom: 10px"
        type="danger"
        plain
        :disabled="delStatus"
        @click="delUser(selectAllUser)"
        v-if="isPerms('user:delete')"
        size="small"
        >删除</el-button
      >
      <el-button
        style="margin-bottom: 10px"
        type="success"
        plain
        @click="bindRoles(selectAllUser, 'selectData')"
        size="small"
        :disabled="bindStatus"
        v-if="isPerms('user:bind')"
        >分配角色</el-button
      >
      <el-button
        style="margin-bottom: 10px"
        type="warning"
        plain
        @click="exportUsers()"
        size="small"
        v-if="isPerms('user:export')"
        >导出</el-button
      >
    </div>
    <div>
      <el-table
        ref="tableF"
        :data="tableData"
        @select="userSelect"
        @select-all="userSelect"
        style="width: 100%"
        row-key="id"
        border
        lazy
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="username" label="用户名称" align="center">
        </el-table-column>
        <el-table-column
          prop="age"
          label="年龄"
          align="center"
        ></el-table-column>
        <el-table-column prop="phone" label="手机号" align="center">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" align="center">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" align="center">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{ scope.row.status === 0 ? "未启用" : "启用" }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" v-if="isPerms('user:update')" @click="editUser('update', scope.row)"
              >修改</el-button
            >
            <el-button type="text" v-if="isPerms('user:bind')" @click="bindRoles(scope.row, 'clickData')"
              >分配角色</el-button
            >
            <el-button type="text" v-if="isPerms('user:delete')" @click="delUser(scope.row)">删除</el-button>
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
        :total="pageTotal"
      >
      </el-pagination>
    </div>

    <el-dialog
      ref="userDig"
      title="编辑用户"
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
              @change="userStatusChange"
              v-model="userStatus"
              active-color="#13ce66"
              inactive-color="#ff4949"
            >
            </el-switch>
          </el-form-item>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUserForm">取 消</el-button>
        <el-button type="primary" @click="submitUserForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      ref="roleDig"
      title="选择角色"
      :visible.sync="showRoleModel"
      width="20%"
      center
    >
      <el-form
        label-position="right"
        label-width="70px"
        :model="userTable"
        style="margin: 20px"
      >
        <div align="left">
          <el-form-item label="角色类型">
            <el-select v-model="userTable.roleId">
              <el-option
                v-for="item in roleData"
                :key="item.roleId"
                :label="item.roleName"
                :value="item.roleId"
              ></el-option>
            </el-select>
          </el-form-item>
          <div slot="footer" class="dialog-role" style="margin-top: 50px">
            <el-button @click="closeRoleForm">取 消</el-button>
            <el-button
              type="primary"
              style="margin-left: 50px"
              @click="submitRoleForm"
              >确 定</el-button
            >
          </div>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>
  
  <script>
import {
  queryUsers,
  addUser,
  updateUser,
  delUser,
  exportUser,
  bindRole,
} from "@/api/system/user/index";

import { queryRoles } from "@/api/system/role/index";
import { getButtonPerms } from "@/utils/perms";
import { download,getRemoteFile } from "@/utils/download"

export default {
  name: "role",
  components: {},
  inject: ["reload"],
  data() {
    return {
      showUserModel: false,
      userTable: {
        username: "",
        phone: "",
        email: "",
        password: "123456",
        age: "",
        status: 0,
      },
      tableData: [],
      selectAllUser: [],
      roleData: [],
      modify: "",
      currentPage: 1,
      pageTotal: 0,
      roleId: "",
      updateStatus: true,
      delStatus: true,
      userStatus: false,
      bindStatus: true,
      showRoleModel: false,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    isPerms(permsValue) {
      return getButtonPerms(permsValue);
    },
    getUserList() {
      let params = {
        pageNo: this.currentPage,
        pageSize: 5,
      };
      queryUsers(params).then((res) => {
        if (res.code === "200") {
          this.tableData = res.results.data;
          this.pageTotal = res.results.total;
        }
      });
      let roleParams = {
        pageNo: 1,
        pageSize: 100,
      };
      queryRoles(roleParams).then((res) => {
        if (res.code === "200") {
          this.roleData = res.results.data;
        }
      });
    },
    editUser(type, data) {
      this.userStatus = false;
      if (type && type != undefined && type != "") {
        this.modify = type;
      }
      if (type == "add") {
        this.userTable = {
          username: "",
          age: "",
          phone: "",
          email: "",
          password: "123456",
          status: 0,
        };
      } else if (type == "update") {
        let userData =
          data && data != undefined && data != ""
            ? data
            : this.selectAllUser[0];
        this.userTable = {
          username: userData.username,
          phone: userData.phone,
          email: userData.email,
          id: userData.id,
          age: userData.age,
          version: userData.version,
          status: userData.status,
        };
        this.userStatus = userData.status == 1 ? true : false;
      }
      this.showUserModel = true;
    },
    delUser(data) {
      let ids = [];
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          debugger;
          if (data instanceof Array) {
            data.forEach((item) => {
              ids.push(item.id);
            });
          } else {
            ids.push(data.id);
          }
          delUser(ids).then((res) => {
            this.$message.success(res.message);
          });
          this.reload();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    closeUserForm() {
      (this.userTable = {
        username: "",
        phone: "",
        email: "",
        age: "",
        password: "123456",
        status: 0,
      }),
        (this.showUserModel = false);
    },
    submitUserForm() {
      let modifyVal = this.modify;
      if (modifyVal == "add") {
        addUser(this.userTable).then((res) => {
          console.log(res);
          if (res.code == "200") {
            this.$message.success(res.message);
            this.reload();
          }
        });
      } else if (modifyVal == "update") {
        updateUser(this.userTable).then((res) => {
          if (res.code == "200") {
            this.$message.success(res.message);
            this.reload();
          }
        });
      }
      this.showUserModel = false;
      this.closeUserForm();
    },
    handleSizeChange(data) {
      console.log("size:" + data);
    },
    handleCurrentChange(data) {
      this.getUserList();
    },
    // 上方按钮
    userSelect(selection, row) {
      console.log(selection);

      if (selection.length == 0) {
        this.delStatus = true;
        this.bindStatus = true;
      }

      if (selection.length < 2) {
        this.delStatus = false;
        this.updateStatus = false;
      } else {
        this.updateStatus = true;
        this.delStatus = false;
        this.bindStatus = false;
      }

      this.selectAllUser = selection;
    },
    bindRoles(data, selectType) {
      let ids = [];
      if (selectType == "selectData") {
        this.selectAllUser.forEach((item) => {
          ids.push(item.id);
        });
        this.userTable = { roleId: "", id: ids };
      } else if (selectType == "clickData") {
        ids.push(data.id);
        this.userTable = { roleId: data["roleId"], id: ids };
      }
      this.showRoleModel = true;
    },
    submitRoleForm() {
      let userTable = this.userTable;
      bindRole(userTable.id, userTable.roleId)
        .then((res) => {
          this.$message.success(res.message);
        })
        .catch((res) => {
          this.$message.error(res.message);
        });
    },
    closeRoleForm() {
      this.roleId = "";
      this.showRoleModel = false;
    },
    exportUsers() {
      let filename = 'user-data.xlsx'
      exportUser({ query: {}, filename: filename })
        .then((res) => {
          if(res.success == true){
            getRemoteFile(filename).then(res=>{
              download(res,filename)
            }).catch(res=>{
              this.$message.error("下载失败")
            })
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
    userStatusChange(data) {
      this.userTable.status = data === true ? 1 : 0;
    },
  },
};
</script>