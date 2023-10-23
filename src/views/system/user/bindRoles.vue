<template>
  <el-dialog
    ref="roleDig"
    title="选择角色"
    :visible.sync="showRoleModel"
    width="380px"
  >
    <el-form label-position="right" label-width="70px" :model="roleData">
      <el-form-item label="角色类型">
        <el-select v-model="roleData.roleId">
          <el-option
            v-for="item in roleList"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item align="right">
        <el-button type="primary" @click="submitRoleForm">确 定</el-button>
        <el-button @click="closeRoleForm">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
import { queryRoles } from "@/api/system/role";
export default {
  name: "bindRoles",
  components: {},
  data() {
    return {
      type: "",
      showRoleModel: false,
      roleList: [],
      roleData: {},
    };
  },
  created() {
    this.getRoleData();
  },
  methods: {
    show(type, data) {
      this.type = type;
      this.roleData = data;
      this.showRoleModel = true;
    },
    getRoleData() {
      queryRoles({ pageNo: 1, pageSize: 100 }).then((res) => {
        if (res.code === "200") {
          this.roleList = res.results.data;
        }
      });
    },
    submitRoleForm() {
      let roleData = this.roleData
      let roleId = roleData.roleId
      let submitData = roleData.id.map(data => {return {id:data,roleId:roleId}})
      this.$emit("submitRole", submitData);
      this.closeRoleForm();
    },
    closeRoleForm() {
      this.type = "";
      this.roleData = {};
      this.showRoleModel = false;
    },
  },
};
</script>