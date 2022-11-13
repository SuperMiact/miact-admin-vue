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
        <el-table-column prop="roleName" label="角色名称" align="center">
        </el-table-column>
        <el-table-column prop="remark" label="备注" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="editRole('update', scope.row)"
              >修改</el-button
            >
            <el-button type="text" @click="allotRole(scope.row)"
              >权限</el-button
            >
            <el-button type="text" @click="deleteRole(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
      ref="roleDig"
      title="编辑角色"
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

    <el-dialog title="权限分配" :visible.sync="dialogPermsVisible">
      <el-tree
        :data="menuList"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
        @check="currentChecked"
      >
      </el-tree>
      <div>
        <el-button
          @click="dialogPermsVisible = false"
          style="margin-left: 200px; margin-right: 50px"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="submitPermsSelect"
          style="margin-right: 50px"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

  <script>
import {
  addRole,
  delRole,
  queryRoles,
  updateRole,
  allotRolePerms,
  allotRolePermsByRoleId,
} from "@/api/system/role/index";
import { getMenu } from "@/api/system/menu/index";

export default {
  name: "role",
  components: {},
  inject: ["reload"],
  data() {
    return {
      showRoleModel: false,
      roleTable: {
        roleName: "",
        remark: "",
      },
      tableData: [],
      modify: "",
      dialogPermsVisible: false,
      menuList: [],
      defaultProps: {
        children: "childNode",
        label: "name",
      },
      checkPermsList: [],
      roleId: "",
    };
  },
  created() {
    this.getRoleData();
  },
  methods: {
    getRoleData() {
      let query = {
        pageNo: 1,
        pageSize: 5,
      };
      queryRoles(query).then((res) => {
        if (res.code == "200") {
          this.tableData = res.results.data;
        }
      });
    },
    editRole(type, data) {
      if (type && type != undefined && type != "") {
        this.modify = type;
      }
      let modify = this.modify;
      if (modify == "add") {
        this.roleTable = {
          roleName: "",
          remark: "",
        };
      } else if (modify == "update") {
        this.roleTable = {
          roleId: data.roleId,
          roleName: data.roleName,
          remark: data.remark,
        };
      }
      this.showRoleModel = true;
    },
    deleteRole(data) {
      delRole(data.roleId).then((res) => {
        if (res.success == true) {
          this.$message.success(res.message);
          this.reload();
        } else {
          this.$message.error(res.message);
        }
      });
    },
    allotRole(data) {
      this.dialogPermsVisible = true;
      getMenu().then((res) => {
        this.menuList = res.results;
      });
      allotRolePermsByRoleId(data.roleId).then((res) => {
        let data = res.results;
        this.$nextTick(() => {
          if (data && data != undefined && data != "") {
            if (data.length == 0) this.$refs.tree.setCheckedKeys([]);
            const nodes = [];
            data.forEach((item) => {
              const node = this.$refs.tree.getNode(item);
              // 过滤掉不是叶子节点的
              if (node.isLeaf) {
                nodes.push(item);
              }
            });
            this.$refs.tree.setCheckedKeys(nodes, true);
          } else {
            this.$refs.tree.setCheckedKeys([]);
          }
          this.checkPermsList = this.$refs.tree.getCheckedNodes(false, true);
        });
      });
      this.roleId = data.roleId;
    },
    submitPermsSelect() {
      let checkPermsList = this.checkPermsList;
      let menuIds = [];
      checkPermsList.forEach((item) => {
        menuIds.push(item.id);
      });
      let query = {
        menuIds,
        roleId: this.roleId,
      };
      allotRolePerms(query).then((res) => {
        this.$message.success(res.message);
      });
      this.dialogPermsVisible = false;
    },
    currentChecked() {
      this.checkPermsList = this.$refs.tree.getCheckedNodes(false, true);
    },
    submitForm() {
      let modify = this.modify;
      if (modify == "add") {
        addRole(this.roleTable)
          .then((res) => {
            if (res.code == "200") {
              this.$message.success("创建完成");
              this.reload();
            }
          })
          .catch((res) => {
            console.log(res);
          });
      } else if (modify == "update") {
        console.log(this.roleTable);
        updateRole(this.roleTable)
          .then((res) => {
            if (res.success == true) {
              this.$message.success(res.message);
              this.reload();
            } else {
              this.$message.error(res.message);
            }
          })
          .catch((res) => {
            console.log(res);
          });
      }
      this.showRoleModel = false;
    },
    cancelForm() {
      this.roleTable = {
        roleName: "",
        remark: "",
      };
      this.showRoleModel = false;
    },
  },
};
</script>
