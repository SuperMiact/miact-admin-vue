<template>
  <div>
    <div>
      <el-button style="margin-bottom: 10px" type="primary" plain @click="showEditRole('add')" size="small">创建角色</el-button>
    </div>
    <div>
      <el-table ref="tableForm" :data="tableData" style="width: 100%" row-key="id" border lazy>
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" align="center"></el-table-column>
        <el-table-column prop="remark" label="备注" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditRole('update', scope.row)">修改</el-button>
            <el-button type="text" @click="showAllotRole(scope.row)">权限</el-button>
            <el-button type="text" @click="deleteRole(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <editRole ref="editRoleModel" @submitRoleForm="submitRoleForm"></editRole>
    <permsRole ref="permsRoleModel" @submitPerms="submitPermsSelect"></permsRole>
  </div>
</template>

  <script>
import { delRole,queryRoles,addRole,updateRole } from "@/api/system/role";
import editRole from "./editRole"
import permsRole from "./permsRole";

export default {
  name: "role",
  components: {
    editRole,
    permsRole,
  },
  data() {
    return {
      tableData: [],
      checkPermsList: [],
    };
  },
  created() {
    this.getRoleData();
  },
  methods: {
    getRoleData() {
      queryRoles({pageNo:1,pageSize:5}).then((res) => {
        if (res.code == "200") {
          this.tableData = res.results.data;
        }
      });
    },
    // 显示编辑角色界面
    showEditRole(type, data) {
      this.$refs.editRoleModel.show(type,type == 'add' ? {} : JSON.parse(JSON.stringify(data)))
    },
    // 保存修改角色
    submitRoleForm(data) {
      !data.roleId?
        addRole(data).then((res) => {
            if (res.success == true) {
                this.$message.success(res.message)
                this.getRoleData()
            }else{
                this.$message.error(res.message)
            }
        }):updateRole(data).then((res) => {
            if (res.success == true) {
              this.$message.success(res.message)
              this.getRoleData()
            } else {
                this.$message.error(res.message);
            }
        })
    },
    // 显示编辑权限界面
    showAllotRole(data) {
      this.$refs.permsRoleModel.show(data)
    },
    // 保存权限
    submitPermsSelect(result,message) {
      if(result){
        this.$message.success(message)
        this.getRoleData()
      }
    },
    // 删除角色
    deleteRole(data) {
      this.$confirm("此操作将删除该条数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {  
          delRole(data.roleId).then((res) => {
            if (res.success == true) {
              this.$message.success(res.message);
              this.getRoleData();
            } else {
              this.$message.error(res.message);
            }
          });
        })
        .catch(() => {
          this.$message({type: "info",message: "已取消删除",});
        });
    },
  },
};
</script>
